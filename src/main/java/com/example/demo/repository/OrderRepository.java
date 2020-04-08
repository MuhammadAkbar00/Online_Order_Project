package com.example.demo.repository;

        import com.example.demo.model.Order;
        import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
        Order findFirstByUserId(long id);
        Order findByUserId(long id);
        Order findByUserIdAndPaidEquals(long id,String paid);
}
