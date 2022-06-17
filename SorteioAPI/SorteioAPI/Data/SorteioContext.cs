using Microsoft.EntityFrameworkCore;
using SorteioAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace SorteioAPI.Data
{
    public class SorteioContext : DbContext
    {
        public  SorteioContext(DbContextOptions<SorteioContext> options ) : base (options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelbuilder) 
        { 
        } 
        public DbSet<Participante> Participantes {get; set;}

        public virtual DbQuery<Participante> ParticipantesSp { get; set; }

    }

}

