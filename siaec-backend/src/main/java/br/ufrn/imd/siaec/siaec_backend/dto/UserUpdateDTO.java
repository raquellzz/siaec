package br.ufrn.imd.siaec.siaec_backend.dto;

import java.time.LocalDate;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDTO {
    private String name;

    private String username;

    private String password;

    private String phone;

    @Past
    private LocalDate dateOfBirth;

    private String description;
}
