package br.ufrn.imd.siaec.siaec_backend.service;

import br.ufrn.imd.siaec.siaec_backend.dto.OrderRequestDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.OrderResponseDTO;
import br.ufrn.imd.siaec.siaec_backend.exception.BusinessRuleException;
import br.ufrn.imd.siaec.siaec_backend.exception.NotFoundException;
import br.ufrn.imd.siaec.siaec_backend.model.Order;
import br.ufrn.imd.siaec.siaec_backend.model.OrderItem;
import br.ufrn.imd.siaec.siaec_backend.model.Product;
import br.ufrn.imd.siaec.siaec_backend.repository.OrderRepository;
import br.ufrn.imd.siaec.siaec_backend.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public OrderResponseDTO createOrder(OrderRequestDTO requestDTO) {
        
        if (requestDTO.getItems() == null || requestDTO.getItems().isEmpty()) {
            throw new BusinessRuleException("O carrinho não pode estar vazio.");
        }

        Order order = new Order();
        order.setCreatedAt(new Date());
        order.setStatus(false); 
        //order.setPaymentMethod(requestDTO.getPaymentMethod() != null ? requestDTO.getPaymentMethod().name() : null);
        order.setShippingFee(requestDTO.getShippingFee());

        
        
        double subtotal = 0.0;

        for (var itemDTO : requestDTO.getItems()) {
            Product product = productRepository.findById(itemDTO.getProductId())
                    .filter(p -> p.getDeletedAt() == null) // Apenas ativos
                    .orElseThrow(() -> new NotFoundException("Produto com ID " + itemDTO.getProductId() + " não encontrado."));

            // RN06
            if (!product.isStatus()) {
                throw new BusinessRuleException("O produto '" + product.getName() + "' não está disponível para venda.");
            }
            
            // RN08
            if (itemDTO.getQuantity() > product.getStock()) {
                throw new BusinessRuleException("Estoque insuficiente para '" + product.getName() + "'. Solicitado: " 
                        + itemDTO.getQuantity() + ", Disponível: " + product.getStock());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setUnitPrice(product.getPrice());
            orderItem.setOrder(order);

            order.getItems().add(orderItem);
            
            subtotal += (product.getPrice() * itemDTO.getQuantity());

            product.setStock(product.getStock() - itemDTO.getQuantity());
            productRepository.save(product); 
        }

        order.setSubtotal(subtotal);
        order.setTotal(subtotal + order.getShippingFee()); 
        
        Order savedOrder = orderRepository.save(order);

        return OrderResponseDTO.fromEntity(savedOrder);
    }
}