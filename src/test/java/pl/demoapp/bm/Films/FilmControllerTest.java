package pl.demoapp.bm.Films;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.context.WebApplicationContext;
import pl.koltex.bm.Films.Producers.Producer;

import java.util.Arrays;
import java.util.List;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@CrossOrigin(origins = "*", maxAge = 3600)
class FilmControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    FilmRepository filmRepository;

  Producer producer = new Producer("RENOLIT");

    @BeforeEach
    public void setup() {

        Film film = new Film("123","OAK",producer,FilmEnum.DOSTEPNA);
        filmRepository.save(film);
    }

    @Test
    public void newFilm() throws Exception {
        this.mockMvc.perform(post("/film")
                .content(asJsonString(new Film("312","DOD",producer,FilmEnum.DOSTEPNA)))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }

    @Test
    public void getAllFilms() throws Exception {
        this.mockMvc.perform(get("/films")).andExpect(status().isOk())
                .andExpect(content().json("[{'number':'123', 'name':'OAK', 'producer':'RENOLIT', 'status':'DOSTEPNA'}]"));
    }

    @Test
    public void getOneFilm() throws Exception {
        this.mockMvc.perform(get("/film/1")).andExpect(status().isOk())
                .andExpect(content().json("{'number':'123', 'name':'OAK', 'producer':'RENOLIT', 'status':'DOSTEPNA'}"));
    }


    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
