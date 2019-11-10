package se.boxinator.api;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;

import java.beans.Transient;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
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

    @MockBean
    private BoxDatabaseService dbMock;

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
    public void mockPing() throws Exception {
        when(dbMock.ping()).thenReturn("pang");
        mvc.perform(MockMvcRequestBuilders.get("/api/ping"))
            .andExpect(status().isOk())
            .andExpect(content().string(equalTo("pang")));
    }
}