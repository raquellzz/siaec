package br.ufrn.imd.siaec.siaec_backend.controller;

import br.ufrn.imd.siaec.siaec_backend.dto.EventDTO;
import br.ufrn.imd.siaec.siaec_backend.model.Event;
import br.ufrn.imd.siaec.siaec_backend.service.EventService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/events")
@Tag(name = "Eventos")
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping("")
    public ResponseEntity<Page<Event>> getEvents(
            @RequestParam(required = false) String name,
            @PageableDefault(size = 10, page = 0) Pageable pageable) {

        Page<Event> events = eventService.findEvents(name, pageable);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable String id) {
        EventDTO event = eventService.findById(id);
        return ResponseEntity.ok(event);
    }

    @PreAuthorize("hasRole('ROLE_EVENT_PLANNER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/my-events")
    public ResponseEntity<Page<Event>> getMyEvents(
            @RequestParam(required = false) String name,
            @PageableDefault(size = 10, page = 0) Pageable pageable) {

        Page<Event> events = eventService.findEvents(name, pageable);
        return ResponseEntity.ok(events);
    }

    @PreAuthorize("hasRole('ROLE_EVENT_PLANNER') or hasRole('ROLE_ADMIN')")
    @PostMapping("/my-events")
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDTO) {
        EventDTO createdEvent = eventService.createEvent(eventDTO);
        return ResponseEntity.ok(createdEvent);
    }

    @PreAuthorize("hasRole('ROLE_EVENT_PLANNER') or hasRole('ROLE_ADMIN')")
    @PutMapping("/my-events/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable String id, @RequestBody EventDTO eventDTO) {
        try {
            EventDTO updatedEvent = eventService.updateEvent(id, eventDTO);
            return ResponseEntity.ok(updatedEvent);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ROLE_EVENT_PLANNER') or hasRole('ROLE_ADMIN')")
    @DeleteMapping("/my-events/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        try {
            eventService.deleteEvent(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/{id}/favorite")
    public ResponseEntity<Void> toggleFavorite(@PathVariable String id) {
        try {
            eventService.toggleFavorite(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/favorites")
    public ResponseEntity<Page<Event>> getFavoriteEvents(
            @PageableDefault(size = 10, page = 0) Pageable pageable) {
        Page<Event> favoriteEvents = eventService.getFavoriteEvents(pageable);
        return ResponseEntity.ok(favoriteEvents);
    }
}
