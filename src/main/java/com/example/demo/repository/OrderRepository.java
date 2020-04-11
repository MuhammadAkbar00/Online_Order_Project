package com.example.demo.repository;

        import com.example.demo.model.Order;
        import org.springframework.data.jpa.repository.JpaRepository;

        import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
        Order findFirstByUserId(Long id);
        Order findByUserId(Long id);
        Order findFirstByUserIdAndPaidEquals(Long id,String paid);
        List<Order> findAllByUserId(Long id);
        Order findFirstByUserId(long id);

        Order findByUserId(long id);

        Order findByUserIdAndPaidEquals(long id, String paid);

        Order findById(long id);

}
