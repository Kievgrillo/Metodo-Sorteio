using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SorteioAPI.Data.Request;
using SorteioAPI.Entities;
using SorteioAPI.Service;

namespace SorteioAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SorteioController : ControllerBase
    {
        private readonly SorteioService _sorteioService;
        private readonly UserService _isorteioService;

        public SorteioController(SorteioService sorteioService, UserService isorteioService)
        {
            _sorteioService = sorteioService;
            _isorteioService = isorteioService;
        }

        [HttpGet]
        public IActionResult GetParticipante()
        {
            var participantes = _sorteioService.GetParticipantes();
            return Ok(participantes);
        }

        [HttpGet("GetFilter/{search}")]
        public IActionResult GetFilterParticipantes(string search)
        {
            var particpantes = _sorteioService.GetFilterParticipantes(search);
            return Ok(particpantes);
        }

        [HttpPost]
        public IActionResult GetSaveGanhador([FromBody] ParticipanteRequest request)
        {
            Result resultado = _sorteioService.GetSaveGanhador(request.Nome, request.Id);
            if ( resultado.IsFailed  )
            {
                return StatusCode(500);
            }
            return Ok(resultado.Successes);
        }
        
        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _isorteioService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Usuário ou nome incorretos" });

            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _isorteioService.GetAll();
            return Ok(users);
        }
    }
}
