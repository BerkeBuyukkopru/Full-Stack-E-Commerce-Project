using API.Models; // IDatabaseSettings ve Product Model'i için
using MongoDB.Bson;
using MongoDB.Driver;

namespace API.Repositories
{
    public class ProductRepository
    {
        private readonly IMongoCollection<Product> _products;

        public ProductRepository(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);

            var database = client.GetDatabase(settings.DatabaseName);

            _products = database.GetCollection<Product>("products");
        }

        public async Task<Product> CreateAsync(Product product)
        {
            await _products.InsertOneAsync(product);
            return product;
        }

        public async Task<List<Product>> GetAllAsync(string? gender = null, string? categoryId = null)
        {
            var builder = Builders<Product>.Filter;
            var filter = builder.Empty;

            if (!string.IsNullOrEmpty(gender))
            {
                // "Unisex" products should probably be returned for both, or explicit match?
                // For now, let's do strict match OR "Unisex" if user is browsing specifically "Man" or "Woman".
                // If filtering by "Unisex", only "Unisex".
                // But usually, if I click "Man", I want "Man" AND "Unisex".
                // Let's implement strict filtering first, user requested "Erkek için eklenenler" (Men's category).
                // Actually they said "Unisex" too? Let's check requirements.
                // "Kategori oluşturma ... erkek, kadın ya da her iki cinsiyete de ait olup olmadığı seçilebilmeli." -> "Unisex"
                // "Erkek başlığı altında ... yalnızca erkekler için eklenmiş ... ürünler listelenmeli" -> This implies matching gender.
                // However, Unisex items usually appear in both.
                // Let's support multiple values or just strict match.
                // Simpler approach: Strict match or "Unisex" included.
                // Let's start with equality check.
                if (gender != "Unisex")
                {
                     filter &= (builder.Eq(p => p.Gender, gender) | builder.Eq(p => p.Gender, "Unisex"));
                }
                else
                {
                     filter &= builder.Eq(p => p.Gender, "Unisex");
                }
            }

            if (!string.IsNullOrEmpty(categoryId))
            {
                filter &= builder.Eq(p => p.Category, categoryId);
            }

            return await _products.Find(filter).ToListAsync();
        }
        public async Task<Product?> GetByIdAsync(string id)
        {
            return await _products.Find(products => products.Id == id).FirstOrDefaultAsync();
        }


        public async Task<bool> UpdateAsync(string id, Product updatedProduct)
        {
            updatedProduct.UpdatedAt = DateTime.UtcNow;
            updatedProduct.Id = id;

            var result = await _products.ReplaceOneAsync(product => product.Id == id, updatedProduct);

            return result.IsAcknowledged && result.ModifiedCount > 0;
        }
        public async Task<Product?> DeleteAsync(string id)
        {
            return await _products.FindOneAndDeleteAsync(product => product.Id == id);
        }


        public async Task<List<Product>> SearchByNameAsync(string productName)
        {
            var filter = Builders<Product>.Filter.Regex(p => p.Name, new BsonRegularExpression(productName, "i"));

            return await _products.Find(filter).ToListAsync();
        }

        public async Task<List<Product>> GetByIdsAsync(List<string> ids)
        {
            var filter = Builders<Product>.Filter.In(p => p.Id, ids);
            return await _products.Find(filter).ToListAsync();
        }

    }
}