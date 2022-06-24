using Microsoft.EntityFrameworkCore;
using SorteioAPI.Models;

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

    }

}

