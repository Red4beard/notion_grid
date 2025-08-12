export default async function handler(req, res) {
    // console.log('👋 API Route started!');
    
    const { NOTION_API_KEY, NOTION_DATABASE_ID } = process.env;

    // Добавляем дефисы в ID если их нет
    const formattedDatabaseId = NOTION_DATABASE_ID.replace(
        /(.{8})(.{4})(.{4})(.{4})(.{12})/,
        '$1-$2-$3-$4-$5'
    );

    try {
        const response = await fetch(
            `https://api.notion.com/v1/databases/${formattedDatabaseId}/query`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${NOTION_API_KEY}`,
                    'Content-Type': 'application/json',
                    'Notion-Version': '2022-06-28',
                },
                body: JSON.stringify({
                    page_size: 100,
                    sorts: [
                        {
                            property: "Posted Date",
                            direction: "descending"
                        }
                    ]
                })
            }
        );

        const data = await response.json();
        res.status(200).json(data);
        
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ error: error.message });
    }
}


