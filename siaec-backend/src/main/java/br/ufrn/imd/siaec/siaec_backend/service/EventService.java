package br.ufrn.imd.siaec.siaec_backend.service;

import br.ufrn.imd.siaec.siaec_backend.dto.EventDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.ProductDTO;
import br.ufrn.imd.siaec.siaec_backend.exception.BusinessRuleException;
import br.ufrn.imd.siaec.siaec_backend.exception.NotFoundException;
import br.ufrn.imd.siaec.siaec_backend.model.Artisan;
import br.ufrn.imd.siaec.siaec_backend.model.EventPlanner;
import br.ufrn.imd.siaec.siaec_backend.model.Catalog;
import br.ufrn.imd.siaec.siaec_backend.model.Event;
import br.ufrn.imd.siaec.siaec_backend.model.Product;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import br.ufrn.imd.siaec.siaec_backend.repository.EventRepository;
import br.ufrn.imd.siaec.siaec_backend.repository.EventPlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventPlannerRepository eventPlannerRepository;


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
        return EventDTO.fromEntity(event);
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

        event.setDeletedAt(new Date());
        eventRepository.save(event);
    }

}
