using AutoMapper;
using FluentResults;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SorteioAPI.Data;
using SorteioAPI.Data.Dtos;
using System.Collections.Generic;
using System.Linq;

namespace SorteioAPI.Service
{
    public class SorteioService 
    {
        private readonly SorteioContext _context;
        private readonly IMapper _mapper;

        public SorteioService(SorteioContext context, IMapper mapper)

        {
            _context = context;
            _mapper = mapper;
        }

        public List<ReadParticipantesDto> GetParticipantes() 
        {
            var participantes = _context.Participantes
                      .FromSqlInterpolated($"SP_PARTICIPANTESGET")
                      .ToList();

            return _mapper.Map<List<ReadParticipantesDto>>(participantes);
        }

        public List<ReadParticipantesDto> GetFilterParticipantes(string search)
        {
            var buscarparam = new SqlParameter("@Search", search);
            var participantes = _context.Participantes
                            .FromSqlRaw($"SP_GetParticipantesByParam @Search", buscarparam)
                            .ToList();

            return _mapper.Map<List<ReadParticipantesDto>>(participantes);
        }

        public Result  GetSaveGanhador(string Nome, int IdPart)
        {
            var paramNome = new SqlParameter("@Nome", Nome);
            var paramID = new SqlParameter("@IdPart", IdPart);
            var resultado = _context.Participantes
                               .FromSqlRaw($"SP_PostGanhador @Nome, @IdPart", paramNome, paramID).ToList();
           

            if (resultado == null) return Result.Fail("erro ao salvar participantes");
            return Result.Ok();
        }
    }
}
