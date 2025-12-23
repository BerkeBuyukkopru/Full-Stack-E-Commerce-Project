using API.Models;
using MongoDB.Driver;

namespace API.Repositories
{
    public class ContactRepository
    {
        private readonly IMongoCollection<Contact> _contacts;

        public ContactRepository(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _contacts = database.GetCollection<Contact>("Contacts");
        }

        public async Task<List<Contact>> GetAllAsync()
        {
            return await _contacts.Find(contact => true).SortByDescending(c => c.CreatedAt).ToListAsync();
        }

        public async Task CreateAsync(Contact contact)
        {
            await _contacts.InsertOneAsync(contact);
        }

        public async Task<Contact> GetByIdAsync(string id)
        {
            return await _contacts.Find(c => c.Id == id).FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(string id, Contact updatedContact)
        {
            await _contacts.ReplaceOneAsync(c => c.Id == id, updatedContact);
        }
    }
}
