using AutoMapper;
using SorteioAPI.Data.Dtos;
using SorteioAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SorteioAPI.Profiles
{
    public class SorteioProfile : Profile
    {
        public SorteioProfile()
        {
            CreateMap<Participante, ReadParticipantesDto>();
        }
    }
}
