package pl.demoapp.bm.Production.OrderPosition;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface OrderPositonRepository extends JpaRepository<OrderPosition, Long> {
  List<OrderPosition> findAllByProductionOrderOrderNumber(String productionOrderOrderNumber);
}
