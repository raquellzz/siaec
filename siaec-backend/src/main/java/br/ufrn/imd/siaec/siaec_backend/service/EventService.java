package br.ufrn.imd.siaec.siaec_backend.service;

import br.ufrn.imd.siaec.siaec_backend.dto.EventDTO;
import br.ufrn.imd.siaec.siaec_backend.exception.NotFoundException;
import br.ufrn.imd.siaec.siaec_backend.model.Event;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import br.ufrn.imd.siaec.siaec_backend.repository.EventRepository;
import br.ufrn.imd.siaec.siaec_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public EventDTO createEvent(EventDTO eventDTO) {
        eventDTO.setCreatedAt(new Date());
        Event eventEntity = eventDTO.toEntity();
        Event savedEvent = eventRepository.save(eventEntity);
        return EventDTO.fromEntity(savedEvent);
    }

    @Transactional(readOnly = true)
    public Page<Event> findEvents(String nameFilter, Pageable pageable) {
        if (nameFilter != null && !nameFilter.isEmpty()) {
            return eventRepository.findByNameContainingIgnoreCaseAndDeletedAtIsNull(nameFilter, pageable);
        } else {
            return eventRepository.findAllByDeletedAtIsNull(pageable);
        }
    }

    @Transactional(readOnly = true)
    public EventDTO findById(String id) {
        Event event = eventRepository.findById(id)
                .filter(e -> e.getDeletedAt() == null)
                .orElseThrow(() -> new NotFoundException("Evento não encontrado com id: " + id));
        
        EventDTO dto = EventDTO.fromEntity(event);

        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        if (auth != null && auth.isAuthenticated() && !auth.getPrincipal().equals("anonymousUser")) {
            String email = auth.getName();
            boolean isFavorited = event.getFavoritedByUsers().stream()
                    .anyMatch(u -> u.getEmail().equals(email));
            
            dto.setFavorite(isFavorited);
        } else {
            dto.setFavorite(false); 
        }

        return dto;
    }

    @Transactional
    public EventDTO updateEvent(String id, EventDTO eventDetails) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Evento não encontrado com id: " + id));

        event.setName(eventDetails.getName());
        event.setDescription(eventDetails.getDescription());
        event.setLocation(eventDetails.getLocation());
        event.setDateStart(eventDetails.getDateStart());
        event.setDateEnd(eventDetails.getDateEnd());
        event.setImagePath(eventDetails.getImagePath());
        Event updatedEvent = eventRepository.save(event);
        return EventDTO.fromEntity(updatedEvent);
    }

    @Transactional
    public void deleteEvent(String id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Evento não encontrado com id: " + id));

        event.setStatus("Cancelado");
        eventRepository.save(event);
    }

    @Transactional 
    public void toggleFavorite(String eventId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado."));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new NotFoundException("Evento não encontrado."));

        System.out.println("Tentando favoritar. Usuário: " + user.getName() + " | Evento: " + event.getName());

        boolean exists = user.getFavoriteEvents().stream()
                .anyMatch(e -> e.getEventId().equals(eventId));

        if (exists) {
            System.out.println("Removendo favorito...");
            user.getFavoriteEvents().removeIf(e -> e.getEventId().equals(eventId));
        } else {
            System.out.println("Adicionando favorito...");
            user.getFavoriteEvents().add(event);
        }
        userRepository.save(user); 
        
        System.out.println("Salvo com sucesso. Total de favoritos: " + user.getFavoriteEvents().size());
    }

    @Transactional(readOnly = true)
    public Page<Event> getFavoriteEvents(Pageable pageable) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return eventRepository.findByFavoritedByUsers_Email(email, pageable);
    }

}
