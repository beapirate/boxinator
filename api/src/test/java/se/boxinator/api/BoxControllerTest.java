package se.boxinator.api;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.greaterThan;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.boot.test.mock.mockito.SpyBean;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.any;
import static org.assertj.core.api.Assertions.assertThat;

import java.beans.Transient;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class BoxControllerTest {

    @Autowired
    private MockMvc mvc;

    @SpyBean
    private BoxDatabaseInterface dbMock;

    @TestConfiguration
    static class BoxDatabasImplTestContextConfiguration {

        @Bean
        public BoxDatabaseInterface boxDatabase() {
            return new BoxDatabaseTestImpl();
        }
    }

    @Test
    public void mockPing() throws Exception {
        when(dbMock.ping()).thenReturn("pang");
        mvc.perform(MockMvcRequestBuilders.get("/api/ping"))
            .andExpect(status().isOk())
            .andExpect(content().string(equalTo("pang")));
    }

    @Test
    public void postEmpty() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/box")
            .contentType(MediaType.APPLICATION_JSON_UTF8)
            .content("{}")
            .accept(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(status().is(400))
            .andExpect(jsonPath("$.errors[*].property",  containsInAnyOrder("recipient_name", "weight", "color", "destination_country")));
    }

    @Test
    public void postWithBoxID() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/box")
            .contentType(MediaType.APPLICATION_JSON_UTF8)
            .content("{ \"box_id\": 1 }")
            .accept(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(status().is(400))
            .andExpect(jsonPath("$.errors[*].property",  containsInAnyOrder("box_id", "recipient_name", "weight", "color", "destination_country")));
    }

    @Test
    public void insertCalledOnValidInput() throws Exception {
        //when(dbMock.Insert()).thenReturn(null);
        mvc.perform(MockMvcRequestBuilders.post("/api/box")
            .contentType(MediaType.APPLICATION_JSON_UTF8)
            .content("{"
                + "\"recipient_name\": \"test1\","
                + "\"weight\": 1.1,"
                + "\"color\": \"#121212\","
                + "\"destination_country\": \"sweden\""
                + "}")
            .accept(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.recipient_name",  equalTo("test1")))
            .andExpect(jsonPath("$.box_id", greaterThan(0)))
            ;
        verify(dbMock).Insert(any(BoxModel.class));
    }


    @Test
    public void listAll() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/box")
            .contentType(MediaType.APPLICATION_JSON_UTF8)
            .content("{"
                + "\"recipient_name\": \"test2\","
                + "\"weight\": 1.1,"
                + "\"color\": \"#121212\","
                + "\"destination_country\": \"sweden\""
                + "}")
            .accept(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(status().isCreated());

        mvc.perform(MockMvcRequestBuilders.get("/api/box")
            .accept(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[*].recipient_name", containsInAnyOrder("test2")));


    }
}