using API.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace API.Repositories
{
    public class UserRepository
    {
        private readonly IMongoCollection<User> _users;
        public UserRepository(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);

            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>("users");
        }

        public async Task<User?> GetByIdAsync(string id)
        {
            return await _users.Find(user => user.Id == id).FirstOrDefaultAsync();
        }
        public async Task<User?> GetByEmailAsync(string email) =>
            await _users.Find(user => user.Email == email).FirstOrDefaultAsync();

        public async Task CreateAsync(User newUser)
        {
            await _users.InsertOneAsync(newUser);
        }

        public async Task<List<User>> GetAllAsync() =>
    await _users.Find(user => true).ToListAsync();


        public async Task<User?> DeleteAsync(string id) =>
        await _users.FindOneAndDeleteAsync(user => user.Id == id);


        public async Task<long> CountAdminsAsync() =>
            await _users.CountDocumentsAsync(user => user.Role == Models.UserRole.admin);

        public async Task UpdateAsync(string id, User updatedUser)
        {
            await _users.ReplaceOneAsync(user => user.Id == id, updatedUser);
        }
        public async Task AddAddressAsync(string userId, Address address)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
            var update = Builders<User>.Update.Push(u => u.Addresses, address);
            await _users.UpdateOneAsync(filter, update);
        }

        public async Task DeleteAddressAsync(string userId, Guid addressId)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
            var update = Builders<User>.Update.PullFilter(u => u.Addresses, a => a.Id == addressId);
            await _users.UpdateOneAsync(filter, update);
        }

        public async Task UpdateAddressAsync(string userId, Address address)
        {
            var filter = Builders<User>.Filter.And(
                Builders<User>.Filter.Eq(u => u.Id, userId),
                Builders<User>.Filter.ElemMatch(u => u.Addresses, a => a.Id == address.Id)
            );

            var update = Builders<User>.Update
                .Set(u => u.Addresses.FirstMatchingElement().Title, address.Title)
                .Set(u => u.Addresses.FirstMatchingElement().Name, address.Name)
                .Set(u => u.Addresses.FirstMatchingElement().Surname, address.Surname)
                .Set(u => u.Addresses.FirstMatchingElement().Phone, address.Phone)
                .Set(u => u.Addresses.FirstMatchingElement().City, address.City)
                .Set(u => u.Addresses.FirstMatchingElement().District, address.District)
                .Set(u => u.Addresses.FirstMatchingElement().Neighborhood, address.Neighborhood)
                .Set(u => u.Addresses.FirstMatchingElement().AddressDetail, address.AddressDetail);

            await _users.UpdateOneAsync(filter, update);
        }
    }
}