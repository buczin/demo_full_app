package pl.demoapp.bm.Users;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class UserInfo {
  private Long id;
  private String name;
  private String username;
  private String role;
  private boolean active;
  private List<GrantedAuthority> authorities;

  private boolean catalogRead;
  private boolean catalogWrite;
  private boolean catalogDelete;
  private boolean systemRead;
  private boolean systemWrite;
  private boolean systemDelete;
  private boolean filmRead;
  private boolean filmWrite;
  private boolean filmDelete;
  private boolean producerRead;
  private boolean producerWrite;
  private boolean producerDelete;
  private boolean clientRead;
  private boolean clientWrite;
  private boolean clientDelete;
  private boolean offerRead;
  private boolean offerWrite;
  private boolean offerDelete;
  private boolean productionRead;
  private boolean productionWrite;
  private boolean productionDelete;

  public UserInfo(User user) {
    this.username = user.getUsername();
    this.name = user.getName();
    this.authorities = Arrays.stream(user.getRole().split(","))
      .map(SimpleGrantedAuthority::new)
      .collect(Collectors.toList());
    this.id = user.getId();
    this.role = user.getRole();
    this.active = user.isActive();
    this.catalogRead = user.isCatalogRead();
    this.catalogWrite = user.isCatalogWrite();
    this.catalogDelete = user.isCatalogDelete();
    this.filmRead = user.isFilmRead();
    this.filmWrite = user.isFilmWrite();
    this.filmDelete = user.isFilmDelete();
    this.clientRead = user.isClientRead();
    this.clientWrite = user.isClientWrite();
    this.clientDelete = user.isClientDelete();
    this.producerRead = user.isProducerRead();
    this.producerWrite = user.isProducerWrite();
    this.producerDelete = user.isProducerDelete();
    this.systemRead = user.isSystemRead();
    this.systemWrite = user.isSystemWrite();
    this.systemDelete = user.isSystemDelete();
    this.offerDelete = user.isOfferDelete();
    this.offerRead = user.isOfferRead();
    this.offerWrite = user.isOfferWrite();
    this.productionDelete = user.isProductionDelete();
    this.productionRead = user.isProductionRead();
    this.productionWrite = user.isProductionWrite();
  }
}
