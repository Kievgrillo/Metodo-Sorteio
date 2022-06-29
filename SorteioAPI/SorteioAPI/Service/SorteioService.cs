using AutoMapper;
using FluentResults;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SorteioAPI.Data;
using SorteioAPI.Data.Dtos;
using SorteioAPI.Entities;
using SorteioAPI.Helpers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace SorteioAPI.Service
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        IEnumerable<User> GetAll();
        User GetById(int id);
    }
    public class SorteioService : IUserService
    {
        private List<User> _users = new List<User>
        {
            new User { Id = 1, FirstName = "Test", LastName = "User", UserName = "test", Password = "test" }
        };

        private readonly SorteioContext _context;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;

        public SorteioService(SorteioContext context, IMapper mapper, IOptions<AppSettings> appSettings)

        {
            _context = context;
            _mapper = mapper;
            _appSettings = appSettings.Value;
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

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _users.SingleOrDefault(x => x.UserName == model.UserName && x.Password == model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public IEnumerable<User> GetAll()
        {
            return _users;
        }

        public User GetById(int id)
        {
            return _users.FirstOrDefault(x => x.Id == id);
        }

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
