export default async function handler(req, res) {
    // Step 1: Initial logging and environment check
    console.log('👋 API Route started!');
    
    const { NOTION_API_KEY, NOTION_DATABASE_ID } = process.env;

    // Log environment variables safely (without exposing full key)
    console.log('🔍 Environment check:', {
        apiKey: NOTION_API_KEY?.substring(0, 5) + '...',
        databaseId: NOTION_DATABASE_ID,
        env: process.env.NODE_ENV
    });

    // Step 2: Validate required variables
    if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
        console.log('❌ Missing required environment variables');
        return res.status(500).json({ 
            error: 'Server configuration error: Missing required variables' 
        });
    }

    try {
        // Step 3: Format the database ID (add dashes if needed)
        const formattedDatabaseId = NOTION_DATABASE_ID.replace(
            /(.{8})(.{4})(.{4})(.{4})(.{12})/,
            '$1-$2-$3-$4-$5'
        );

        console.log('📝 Database ID formatting:', {
            original: NOTION_DATABASE_ID,
            formatted: formattedDatabaseId
        });

        // Step 4: Prepare Notion API request
        const notionUrl = `https://api.notion.com/v1/databases/${formattedDatabaseId}/query`;
        console.log('🎯 Request URL:', notionUrl);

        const requestBody = {
            page_size: 100,
            sorts: [
                {
                    property: "Posted Date",
                    direction: "descending"
                }
            ]
        };

        // Step 5: Send request to Notion
        console.log('📤 Sending request to Notion...');
        const response = await fetch(notionUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28',
            },
            body: JSON.stringify(requestBody)
        });

        // Step 6: Handle the response
        const data = await response.json();
        
        console.log('📥 Response status:', {
            status: response.status,
            hasData: !!data.results,
            itemCount: data.results?.length || 0
        });

        // Step 7: Check for API errors
        if (!response.ok) {
            console.log('❌ Notion API error:', {
                status: response.status,
                code: data.code,
                message: data.message
            });
            
            return res.status(response.status).json({
                error: 'Notion API error',
                details: data
            });
        }

        // Step 8: Return successful response
        console.log('✅ Request successful!', {
            resultCount: data.results.length
        });
        
        return res.status(200).json(data);

    } catch (error) {
        // Step 9: Handle unexpected errors
        console.error('💥 Error:', {
            type: error.name,
            message: error.message,
            stack: error.stack
        });
        
        return res.status(500).json({
            error: 'Server error',
            message: error.message
        });
    }
}