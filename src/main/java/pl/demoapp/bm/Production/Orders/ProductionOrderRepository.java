package pl.demoapp.bm.Production.Orders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductionOrderRepository extends JpaRepository<ProductionOrder, String> {

  List<ProductionOrder> findAllByStatusOrder(StatusOrder statusOrder);

  @Query(value = "SELECT * FROM production_order WHERE MONTH(date_acceptance_order) = ?1 AND my_company_id = ?2  ORDER BY ABS(order_number) DESC LIMIT 1", nativeQuery = true)
  Optional<ProductionOrder> findByDateAcceptanceOrder(int month, Long myCompanyId);

}
