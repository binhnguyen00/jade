import React from "react";
import { SendHorizonal } from "lucide-react";

import { useForm } from "@mantine/form";
import { Textarea, Group, Button, Select, Container, Stack, ScrollArea, Box } from "@mantine/core";

import { useChat } from "hooks";
import { ChatModel, ChatResponse } from "types";

interface UIChatBoxProps {

}

export function UIChatBox(props: UIChatBoxProps) {
  const { chat } = useChat();
  const [ content, setContent ] = React.useState<string>("");

  const form = useForm({
    mode: "controlled",
    initialValues: {
      prompt: "",
      model: ChatModel.OPENAI,
    },
    validate: {
      prompt: (value) => value.trim().length === 0 ? "Prompt is required" : null,
    },
  });

  const ask = () => {
    const { model, prompt } = form.values;
    chat({
      model,
      prompt,
      successCB: (response: ChatResponse) => {
        setContent(response.message.content);
      },
      failCB: (error: any) => {
        console.error(error);
      },
    });
  };

  return (
    <form
      onSubmit={form.onSubmit(() => ask())}
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Group justify="flex-start" top={0} bg="white" p="xs" style={{ position: "sticky", zIndex: 1 }}>
        <Select
          key={form.key("model")}
          data={[
            { value: ChatModel.OPENAI, label: "GPT" },
            { value: ChatModel.DEEPSEEK, label: "DeepSeek" },
          ]}
          {...form.getInputProps("model")}
        />
      </Group>

      <Container size={600} style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <ScrollArea>
          <div> 
            {/* {content}  */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ex explicabo numquam ea accusamus voluptas ad sequi recusandae neque in consectetur nostrum dolorem quibusdam expedita magnam culpa animi, minus id! Eligendi repellendus sapiente tempore eos esse accusamus natus a nihil deleniti reprehenderit at mollitia sequi quaerat, impedit facilis! A sunt similique officia error eius nesciunt aliquid optio, culpa magnam nam et! Aut ipsam quae accusantium alias fugiat blanditiis, beatae ad quia laborum ipsum pariatur, veniam distinctio, nisi ea voluptatum nihil totam quos obcaecati aliquam ab voluptatibus consequatur odit iusto! Saepe optio praesentium at explicabo sunt. Qui, porro doloribus? Ratione voluptate, earum sint soluta impedit nulla nam inventore eum natus cupiditate deleniti aspernatur amet magnam dolore vero. Pariatur natus, sequi necessitatibus sint neque tempora amet doloremque fuga non culpa deserunt laborum dolor, eligendi soluta magnam quia est, molestiae ipsam sapiente mollitia illum libero nostrum? Culpa sequi eum asperiores inventore, nisi non odit maxime repudiandae laudantium nostrum quasi. Aliquam commodi provident similique, aperiam, odio deserunt quidem minus quos quod ipsa autem dolores accusamus! Explicabo voluptatum blanditiis est impedit numquam deleniti neque sunt ut, dolore eveniet aliquam dolores quo animi eos obcaecati ex, pariatur culpa dignissimos. Nam porro maxime veniam dolore accusamus error quidem amet assumenda omnis quis in harum tempora at, iure suscipit eos aliquid praesentium, blanditiis magni, commodi animi culpa. Vero impedit ipsum molestias fugit dicta ex! Numquam, assumenda nobis est facere repellat fuga atque repellendus optio illum esse autem obcaecati magnam quam nihil sequi doloremque incidunt modi veritatis? Odit culpa unde cupiditate numquam vitae, quo natus repellendus? Distinctio est quod in expedita nisi, obcaecati dignissimos excepturi? Ipsum, ex qui. Vero sit corrupti, delectus minus unde perferendis praesentium labore dignissimos numquam nemo facilis pariatur molestiae illum veniam, qui totam culpa! Repellendus a numquam voluptas provident. Fugiat quisquam dolorum sed dolorem eos autem doloribus ipsa nesciunt distinctio temporibus quis sunt libero ad, nostrum necessitatibus tenetur voluptate accusamus cupiditate eaque vero debitis soluta dolor at. Enim eius optio quisquam possimus rerum, quas asperiores vel eum odit? Alias repellendus vero recusandae nobis libero laboriosam doloribus nesciunt repudiandae dolore quaerat ipsam odio voluptas obcaecati modi, facere dicta distinctio autem tempore accusamus, sapiente illum eum officiis placeat? Perspiciatis nobis unde maxime ullam quas excepturi veniam! Officia, ex, dolor quasi adipisci saepe quos, animi dolore quis laboriosam delectus omnis ea! Non assumenda blanditiis aliquid nostrum, similique quo, sed dignissimos nam sit cum itaque, temporibus maiores voluptatibus! Earum itaque quo corporis minima excepturi, atque ipsum! Fugiat odit dicta aspernatur provident dolores ab! Quibusdam dolorem molestias iure inventore explicabo omnis magnam! Blanditiis voluptatibus eligendi quod sit. Vitae laborum quos atque ea, dicta doloribus esse inventore ipsa molestiae harum doloremque maiores! Incidunt, eum. Atque, iste. Odio, quam adipisci nemo iure facilis ipsam quibusdam aliquam repudiandae quaerat! Minus aspernatur iusto quis nemo! Magnam ullam ex, non beatae voluptatibus porro adipisci exercitationem sed. Perferendis quo blanditiis odit magni asperiores quae quod ratione reiciendis alias, commodi, quibusdam animi? Optio sed neque quis expedita libero qui sunt voluptatibus debitis, temporibus aspernatur odit, nobis maiores!
          </div>
        </ScrollArea>
        <Group justify="flex-end" py="xs">
          <Textarea
            key={form.key("prompt")}
            placeholder="What's on your mind?"
            maxRows={6} autosize w="100%"
            {...form.getInputProps("prompt")}
          />
          <Button type="submit">
            <SendHorizonal />
          </Button>
        </Group>
      </Container>
    </form>
  );
}
