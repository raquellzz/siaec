package br.ufrn.imd.siaec.siaec_backend.dto;

import br.ufrn.imd.siaec.siaec_backend.model.Admin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AdminDTO {

    private String id;

    @NotBlank(message = "O nome é obrigatório")
    private String name;

    @NotBlank(message = "O email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    private String password;

    private String department;

    public AdminDTO() {}

    public static AdminDTO fromEntity(Admin admin) {
        AdminDTO dto = new AdminDTO();
        dto.setId(admin.getId());
        dto.setDepartment(admin.getDepartment());
        
        if (admin.getUser() != null) {
            dto.setName(admin.getUser().getName());
            dto.setEmail(admin.getUser().getEmail());
        }
        return dto;
    }
} 

