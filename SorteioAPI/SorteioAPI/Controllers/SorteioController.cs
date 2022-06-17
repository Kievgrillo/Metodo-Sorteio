using Microsoft.AspNetCore.Mvc;
using SorteioAPI.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SorteioAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SorteioController : ControllerBase
    {
        private readonly SorteioService _sorteioService;

        public SorteioController(SorteioService sorteioService)
        {
            _sorteioService = sorteioService;
        }

        [HttpGet]
        public IActionResult GetParticipante() 
        {
            var participantes = _sorteioService.GetParticipantes();
            return Ok(participantes);
        }
    }
}
