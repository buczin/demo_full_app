package pl.demoapp.bm.Offers.Offer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OfferRepository extends JpaRepository<Offer, String> {

  @Query(value = "SELECT * FROM offer WHERE MONTH(offer_date) = ?1 AND my_company_id = ?2  ORDER BY ABS(offer_number) DESC LIMIT 1", nativeQuery = true)
  Optional<Offer> findByOfferDate(int month, Long myCompanyId);

  List<Offer> findAllByOfferStatus(OfferStatus status);
}
