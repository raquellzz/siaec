package br.ufrn.imd.siaec.siaec_backend.controller;

import br.ufrn.imd.siaec.siaec_backend.dto.OrderRequestDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.OrderResponseDTO;
import br.ufrn.imd.siaec.siaec_backend.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@Tag(name = "Pedidos")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<OrderResponseDTO> createOrder(@Valid @RequestBody OrderRequestDTO orderRequestDTO) {
        OrderResponseDTO newOrder = orderService.createOrder(orderRequestDTO);
        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @GetMapping("/my-orders")
    public ResponseEntity<Page<OrderResponseDTO>> getMyOrders(Pageable pageable) {
        Page<OrderResponseDTO> myOrders = orderService.findMyOrders(pageable);
        return ResponseEntity.ok(myOrders);
    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable String id) {
        OrderResponseDTO order = orderService.findOrderById(id);
        return ResponseEntity.ok(order);
    }
}