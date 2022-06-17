using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SorteioAPI.Data;
using SorteioAPI.Data.Dtos;
using SorteioAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

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
                      .FromSqlInterpolated($"SP_PARTICIPANTEGET")
                      .ToList();

            return _mapper.Map<List<ReadParticipantesDto>>(participantes);
                
        } 
    }
}
