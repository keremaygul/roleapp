# Rol Yönetim Sistemi

Bu proje, kullanıcı ve rol yönetimini sağlayan full-stack bir web uygulamasıdır. Sistem, kullanıcıların yetkilendirmelerini ve rollerini yönetmeyi amaçlamaktadır.
![login-screen](https://github.com/user-attachments/assets/4b0bbab4-b772-46ff-854f-61ccf03e8d89)
![dashboard](https://github.com/user-attachments/assets/d2eda7d5-a284-4d8f-a80f-608b87f2daad)
![edit-roles](https://github.com/user-attachments/assets/1ea36739-f2f4-4268-a5ff-1d4e54f6e024)

## 🚀 Teknolojiler

### Backend (.NET Core 8.0)
- **ASP.NET Core 8.0**: Web API framework'ü
- **Entity Framework Core**: ORM ve veritabanı işlemleri için
- **JWT Authentication**: Güvenli kimlik doğrulama için
- **SQL Server**: Veritabanı yönetimi
- **Swagger/OpenAPI**: API dokümantasyonu

### Frontend (React)
- **React 18**: Modern UI geliştirme
- **React Router Dom**: Sayfa yönlendirmeleri
- **Axios**: HTTP istekleri
- **Bootstrap 5**: Responsive tasarım
- **Font Awesome**: İkonlar

## 🏗️ Proje Mimarisi

### Backend Mimarisi
- **Controllers/**: API endpoint'lerini içeren kontrolcüler
  - `AuthController`: Kimlik doğrulama işlemleri
  - `RoleController`: Rol yönetimi
  - `UserController`: Kullanıcı işlemleri
- **Models/**: Veritabanı modelleri
  - `User`: Kullanıcı bilgileri
  - `Role`: Rol tanımlamaları
  - `UserRole`: Kullanıcı-rol ilişkileri
- **Data/**: Veritabanı context ve konfigürasyonları
- **Migrations/**: Veritabanı migration dosyaları

### Frontend Mimarisi
- **src/**
  - `components/`: Yeniden kullanılabilir UI bileşenleri
  - `pages/`: Sayfa bileşenleri
  - `services/`: API istekleri ve servis katmanı
  - `utils/`: Yardımcı fonksiyonlar
  - `App.js`: Ana uygulama bileşeni

## 🌟 Özellikler

- Kullanıcı kaydı ve girişi
- JWT tabanlı kimlik doğrulama
- Rol bazlı yetkilendirme
- Kullanıcı rolleri yönetimi
- Responsive tasarım
- Modern ve kullanıcı dostu arayüz

## 🛠️ Kurulum

### Backend Kurulumu
1. Visual Studio veya VS Code ile role-backend projesini açın
2. Gerekli NuGet paketlerini yükleyin
3. `appsettings.json` dosyasında veritabanı bağlantı ayarlarını yapın
4. Migration'ları uygulayın:
   ```
   dotnet ef database update
   ```
5. Projeyi çalıştırın

### Frontend Kurulumu
1. role-frontend klasörüne gidin
2. Bağımlılıkları yükleyin:
   ```
   npm install
   ```
3. Geliştirme sunucusunu başlatın:
   ```
   npm start
   ```

## 🔒 Güvenlik

- JWT token bazlı kimlik doğrulama
- Rol tabanlı yetkilendirme
- Güvenli parola yönetimi
- CORS politikaları

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun
