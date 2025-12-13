using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")] // Rota: /api/test
public class TestController : ControllerBase
{
    // Bu metod [Authorize] niteliği ile korunmuştur.
    // Sadece geçerli JWT Token'ı olanlar erişebilir.
    [HttpGet("protected")] // Rota: /api/test/protected
    [Authorize] 
    public IActionResult GetProtectedData()
    {
        // Token geçerliyse, kullanıcı kimliği (Claim) burada olacaktır.
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        
        return Ok($"Hoş geldiniz, yetkili kullanıcı! Sizin ID'niz: {userId}");
    }

    // Bu metod herkes için açıktır (Token gerektirmez)
    [HttpGet("public")] // Rota: /api/test/public
    public IActionResult GetPublicData()
    {
        return Ok("Bu herkese açık bir rotadır.");
    }
}