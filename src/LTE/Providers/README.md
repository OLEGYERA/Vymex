#Providers 🚢
Система поставки готовых функциональных решений Vymex, для многократного использования в проекте!

##Setting 📦 
 - UploadAvatar ([upload-avatar.ui.vue]('/Setting/upload-avatar.ui.vue'))
 
    **Props:** 
                    
    - `title(String❗)`  
    - `description(String)`
    - `sizeWarning(Object❗)`

          {
            warning(String❗): 'JPG or PNG. Max size of 4MB', 
            maxSize(Number❗): 4, 
            allowedTypes(String❗): '.jpg,.jpeg,.png'
          }
    
    - `avatar(Object❗)`
        
          {
            logo(String❗): (logoPath or Initials)
            colorCode(Number❗): 1 (some ID), 
          }
 