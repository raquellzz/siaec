package br.ufrn.imd.siaec.siaec_backend.service;

import br.ufrn.imd.siaec.siaec_backend.exception.ResourceNotFoundException;
import br.ufrn.imd.siaec.siaec_backend.model.Event;
import br.ufrn.imd.siaec.siaec_backend.repository.EventRepository;
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

    @Transactional
    public Event createEvent(Event event) {
        event.setCreatedAt(new Date());
        return eventRepository.save(event);
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
    public Optional<Event> findById(String id) {
        return eventRepository.findById(id)
                .filter(event -> event.getDeletedAt() == null);
    }

    @Transactional
    public Event updateEvent(String id, Event eventDetails) {
        Event event = findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado com id: " + id));

        event.setName(eventDetails.getName());
        event.setDescription(eventDetails.getDescription());
        event.setLocation(eventDetails.getLocation());
        event.setDateStart(eventDetails.getDateStart());
        event.setDateEnd(eventDetails.getDateEnd());
        event.setImagePath(eventDetails.getImagePath());

        return eventRepository.save(event);
    }

    @Transactional
    public void deleteEvent(String id) {
        Event event = findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado com id: " + id));

        event.setDeletedAt(new Date());
        eventRepository.save(event);
    }
}
