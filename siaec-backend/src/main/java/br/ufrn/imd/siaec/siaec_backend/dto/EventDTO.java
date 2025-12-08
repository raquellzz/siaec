package br.ufrn.imd.siaec.siaec_backend.dto;

import br.ufrn.imd.siaec.siaec_backend.model.Event;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;

@Data
public class EventDTO {

    private String eventId;

    @NotBlank(message = "O nome do evento é obrigatório")
    private String name;

    @NotBlank
    private String status;

    @NotBlank(message = "A descrição do evento é obrigatória")
    private String description;

    @NotBlank(message = "A data de início é obrigatória")
    private String dateStart;

    @NotBlank(message = "A data de término é obrigatória")
    private String dateEnd;

    @NotBlank(message = "A localização é obrigatória")
    private String location;

    private String imagePath;

    private Date createdAt;

    public EventDTO() {}

    public static EventDTO fromEntity(Event event) {
        EventDTO dto = new EventDTO();
        dto.setEventId(event.getEventId());
        dto.setName(event.getName());
        dto.setStatus(event.getStatus());
        dto.setDescription(event.getDescription());
        dto.setDateStart(event.getDateStart());
        dto.setDateEnd(event.getDateEnd());
        dto.setLocation(event.getLocation());
        dto.setImagePath(event.getImagePath());
        dto.setCreatedAt(event.getCreatedAt());
        
        
        return dto;
    }

    public Event toEntity() {
        Event event = new Event();
        event.setName(this.name);
        event.setStatus(this.status);
        event.setDescription(this.description);
        event.setDateStart(this.dateStart);
        event.setDateEnd(this.dateEnd);
        event.setLocation(this.location);
        event.setImagePath(this.imagePath);
        return event;
    }
}