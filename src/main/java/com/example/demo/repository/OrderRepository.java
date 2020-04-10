package com.example.demo.repository;

        import com.example.demo.model.Order;
        import org.springframework.data.jpa.repository.JpaRepository;

        import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
        Order findFirstByUserId(Long id);
        Order findByUserId(Long id);
        Order findFirstByUserIdAndPaidEquals(Long id,String paid);
}
