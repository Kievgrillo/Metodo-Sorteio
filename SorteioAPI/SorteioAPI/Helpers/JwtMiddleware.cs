using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SorteioAPI.Service;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SorteioAPI.Helpers
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly AppSettings _appSettings;

        public JwtMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings)
        {
            _next = next;
            _appSettings = appSettings.Value;
        }

        public async Task Invoke(HttpContext context, UserService iuserService)
        {
            var token = context.Request.Headers["Authorizations"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                attachUserToContext(context, iuserService, token);

            await _next(context);
        }

        private void attachUserToContext(HttpContext context, UserService iuserService, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,

                    // define o clockskew para zero para que os tokens expirem exatamente no tempo de expiração do token (em vez de 5 minutos depois)

                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                // anexa o usuário ao contexto na validação jwt bem-sucedida

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

                // não faz nada se a validação do jwt falhar
                // o usuário não está anexado ao contexto, então a solicitação não terá acesso a rotas seguras

                context.Items["User"] = iuserService.GetById(userId);
            }
            catch
            {
                
            }
        }
    }
}
