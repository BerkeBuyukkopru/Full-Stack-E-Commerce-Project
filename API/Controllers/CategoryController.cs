using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Repositories;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly CategoryRepository _categoryRepository;

    // Repository'yi Dependency Injection (DI) ile alıyoruz
    public CategoryController(CategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    // Rota: POST /api/category
    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] Category newCategory)
    {
        if (string.IsNullOrWhiteSpace(newCategory.Name) || string.IsNullOrWhiteSpace(newCategory.Img))
        {
            // HTTP 400 Bad Request
            return BadRequest("Kategori adı ve resim URL'si zorunludur.");
        }

        try
        {
            await _categoryRepository.CreateAsync(newCategory);
            // HTTP 201 Created yanıtı ile yeni objeyi döndürür
            return CreatedAtAction(nameof(Get), new { id = newCategory.Id }, newCategory);
        }
        catch (Exception ex)
        {
            // Geliştirme ortamında hatayı loglar ve HTTP 500 döndürür.
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // Rota: GET /api/category
    [HttpGet]
    public async Task<ActionResult<List<Category>>> Get()
    {
        try
        {
            // Kategorileri Repository'den çekiyoruz
            var categories = await _categoryRepository.GetAllAsync();

            return Ok(categories);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);

            // HTTP 500 Internal Server Error yanıtı
            return StatusCode(500, new { error = "Internal server error." });
        }
    }

    // Rota: GET /api/category
    [HttpGet("{id}")]
    public async Task<ActionResult<List<Category>>> Get(string id)
    {
        try
        {
            // Kategorileri Repository'den çekiyoruz
            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return NotFound(new { error = "Kategori Bulunamadı." });
            }

            return Ok(category);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);

            // HTTP 500 Internal Server Error yanıtı
            return StatusCode(500, new { error = "Server error." });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(string id, [FromBody] Category updatedCategory)
    {
        if (string.IsNullOrWhiteSpace(updatedCategory.Name) || string.IsNullOrWhiteSpace(updatedCategory.Img))
        {
            return BadRequest("Kategori adı ve resim URL'si zorunludur.");
        }

        try
        {
            // Repository metodunu çağırarak güncellemeyi yap
            var isSuccessful = await _categoryRepository.UpdateAsync(id, updatedCategory);

            if (!isSuccessful)
            {
                return NotFound(new { error = "Kategori bulunamadı veya değiştirilmedi." });
            }
            return Ok(updatedCategory);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500, new { error = "Server error." });
        }
    }

    [HttpDelete("{id}")]

    public async Task<IActionResult> DeleteCategory(string id)
    {
        try
        {
            var deletedCategory = await _categoryRepository.DeleteAsync(id);

            if(deletedCategory == null)
            {
                return NotFound(new { error = "Kategori Bulunamadı." });
            }
            return Ok(deletedCategory);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500, new{error="Server Error"});
        }
    }
}
