
class NotionService {
    async getInstagramContent() {
        try {
            const response = await fetch('/api/notion');
            if (!response.ok) {
                throw new Error(`Ошибка получения данных: ${response.status}`);
            }
            const data = await response.json();
            return data.results.map(page => this.formatPageData(page));
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            throw error;
        }
    }

    // Добавляем метод formatPageData, который использовался в предыдущей версии
    formatPageData(page) {
        return {
            id: page.id,
            title: page.properties.Title?.title?.[0]?.text?.content || '',
            imageUrl: page.properties.Image?.files?.[0]?.file?.url || '',
            type: page.properties.Type?.select?.name || '',
            postedDate: page.properties['Posted Date']?.date?.start || ''
        };
    }
}


const notionService = new NotionService();


export default notionService;

