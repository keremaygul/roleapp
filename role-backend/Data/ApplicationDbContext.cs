using Microsoft.EntityFrameworkCore;
using role_backend.Models;

namespace role_backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId);

            // Admin rolünü ekle
            var adminRole = new Role
            {
                Id = 1,
                Name = "Admin",
                Description = "Sistem yöneticisi rolü"
            };

            // User rolünü ekle
            var userRole = new Role
            {
                Id = 2,
                Name = "User",
                Description = "Normal kullanıcı rolü"
            };

            // Manager rolünü ekle
            var managerRole = new Role
            {
                Id = 3,
                Name = "Manager",
                Description = "Yönetici rolü"
            };

            // Admin kullanıcısını ekle
            var adminUser = new User
            {
                Id = 1,
                Username = "admin",
                Email = "admin@example.com",
                Password = "admin123",
                FirstName = "Admin",
                LastName = "User",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            // Admin kullanıcısına Admin rolünü ata
            var adminUserRole = new UserRole
            {
                UserId = adminUser.Id,
                RoleId = adminRole.Id
            };

            modelBuilder.Entity<Role>().HasData(adminRole, userRole, managerRole);
            modelBuilder.Entity<User>().HasData(adminUser);
            modelBuilder.Entity<UserRole>().HasData(adminUserRole);
        }
    }
}