import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Title, Group, ScrollArea, CloseButton, Burger, Skeleton, Text, Textarea } from "@mantine/core";

import { UIChatBox } from "./UIChatBox";
import { UISideBar } from "./UISideBar";

export function UIHome() {
  const [ mobileOpened, { toggle: toggleMobile } ] = useDisclosure();
  const [ desktopOpened, { toggle: toggleDesktop } ] = useDisclosure(true);

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: "auto" }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !mobileOpened, desktop: !desktopOpened } }}
      padding="md"
    >

      <AppShell.Header>
        <Group h="100%" px="md">
          <Title> Jade </Title>
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm"/>
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm"/>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Group justify="space-between">
          <Text> Conversations </Text>
        </Group>
        {
          Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))
        }
      </AppShell.Navbar>

      <AppShell.Main style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <ScrollArea>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto quaerat facere eos, nihil id similique consectetur reprehenderit earum ab ut necessitatibus, doloremque neque quibusdam omnis harum quam rerum totam vitae temporibus voluptatibus reiciendis beatae sunt. Sunt nisi cumque aspernatur ab totam velit officiis delectus? Mollitia eum, architecto ipsam eos ad ex modi perspiciatis nam debitis! Ullam asperiores consequatur vero, iure corrupti deserunt distinctio dignissimos quis harum quo inventore! Nulla ipsum eligendi commodi qui atque maxime sunt error. Sit autem laboriosam placeat debitis rem reiciendis quo labore nostrum distinctio voluptates ipsa delectus, totam officia molestiae quam, quia nam neque quis fuga aspernatur amet, temporibus non? Quos ut officiis molestiae suscipit corporis, ab, praesentium a obcaecati excepturi ullam expedita nostrum quisquam molestias consequatur iure voluptas? Dolor placeat praesentium laudantium eligendi asperiores repellendus magnam itaque neque fugit vel ipsam quis, debitis commodi, dolorum quae impedit illum? Culpa soluta ex nesciunt quasi, perspiciatis cupiditate officia eveniet repellat amet odit at veniam eos doloribus ab non, earum perferendis deserunt similique, vero molestias voluptate blanditiis nam. Quos accusamus at doloremque libero exercitationem, sapiente expedita nulla tempora ab inventore officia consequatur animi? Dolor, omnis possimus quia, magnam rerum corporis beatae ullam, excepturi repellat recusandae iusto quae adipisci dolore ex magni sit provident ducimus? Unde autem quasi quas nesciunt quam maiores eos commodi similique dolore eius dolorem pariatur, iusto explicabo sit libero, numquam asperiores deserunt? Quaerat doloremque sint facere, ad exercitationem beatae neque quam ut inventore ullam magnam, dicta ipsum, pariatur voluptatum eius rem alias! Aliquam impedit atque est aut suscipit illo quibusdam quia esse saepe delectus minima officia cumque quae vel, porro hic nobis non consequatur numquam enim? Odio, earum cum, incidunt tempora vel fuga minus voluptas temporibus velit cupiditate nesciunt? Iste dignissimos commodi molestiae asperiores magnam quia veniam ipsam corporis officiis, laudantium laborum autem mollitia sunt unde aperiam quibusdam eum ducimus. Harum culpa veritatis omnis nulla eos voluptatem, dicta sed ipsa aliquid quasi, quisquam ut, saepe eius. Maxime incidunt laudantium quasi architecto minus voluptatibus nostrum impedit quam temporibus! Voluptatibus eius commodi beatae blanditiis ab, quos sint magni veniam? Dolor aspernatur, minus veniam quaerat consectetur at delectus iste enim, eligendi atque unde? Quia vitae soluta temporibus quasi nisi, dicta repellat sequi cumque impedit officiis eveniet consequatur dignissimos nam, blanditiis aperiam voluptatibus excepturi. Consequatur debitis minima tempore! Facere nam odit earum? Veniam expedita deleniti necessitatibus ea distinctio aspernatur amet neque porro maiores fugiat possimus nam est a, nobis obcaecati minima commodi ratione quas doloribus adipisci sequi cumque vel. Aliquid, eos? Placeat cupiditate assumenda nihil temporibus dolorum dicta odit minus dolores mollitia omnis ut ratione nostrum qui exercitationem quis aperiam, fugiat voluptatum illo ipsum recusandae incidunt quae ipsa, soluta quos? Voluptate tempora neque natus? Nihil voluptate ab voluptatibus natus. Veniam laboriosam suscipit libero minima dolorum repellat, itaque unde quasi qui! Praesentium magni voluptates iure accusamus excepturi enim hic labore molestias! Ipsam laudantium amet alias consectetur ducimus excepturi praesentium nisi earum ullam voluptatibus molestias reiciendis, corporis odio cum atque. Explicabo ipsa iusto quisquam possimus porro optio adipisci accusantium non ducimus voluptas maxime, nesciunt aliquid laborum ad voluptatibus sit? Dicta nostrum facere veniam. Unde animi dolor perspiciatis accusamus modi ullam necessitatibus molestias nobis nemo ea consectetur ipsam non officiis cumque iure, corrupti perferendis deleniti! Reprehenderit fugit alias qui beatae nobis. Expedita incidunt distinctio, cum qui molestiae iste dolorem itaque et in atque, ipsa eum veniam, delectus quae consequuntur nam. Assumenda dolorum distinctio provident debitis sed sequi numquam delectus quidem qui similique fugiat accusamus enim veniam nulla, repellendus illo, natus sint nemo laborum soluta quia. Ullam, nam. Eaque odit amet voluptatum aliquid libero quas facilis. Sequi ex minus dignissimos optio fugiat placeat repellendus nostrum accusamus exercitationem dolore illo rem perspiciatis a, ad voluptate quia ducimus autem omnis soluta. Dignissimos molestiae quas voluptatibus debitis. Accusantium perspiciatis possimus excepturi iure debitis iste ratione laudantium autem dolor, atque, distinctio reiciendis repellendus, rem nihil eaque. Dolorum quia, perferendis rerum totam mollitia eligendi pariatur similique ut dolor atque qui quae nam quasi omnis ex neque quibusdam placeat. Fuga, laboriosam provident consectetur delectus quam eius rerum animi enim praesentium voluptas facilis est unde explicabo. Voluptatum, nobis qui numquam doloremque id rem pariatur deserunt repudiandae magnam, architecto odio harum quibusdam culpa nulla quisquam quam. Veniam error quia eligendi ex natus eos voluptatum sed, qui deleniti a est quidem atque! Odit sapiente quisquam recusandae nulla aspernatur quo aliquid sunt iusto optio enim repellat consectetur, deserunt debitis, itaque, dolor rem. Ratione voluptatibus, aliquid distinctio blanditiis culpa quos magni laudantium alias quibusdam reiciendis iste error aperiam sequi sed veniam asperiores deleniti aut ex quo numquam ut quas similique vel molestias! Dolore recusandae sunt eos ex officia ipsum id sint sequi, consequatur quos atque minima nulla blanditiis praesentium quod quo ut impedit quaerat voluptatem voluptates eius fugit dolor cupiditate? Sapiente quaerat quasi obcaecati ab. Beatae quod corrupti deleniti facilis praesentium, illo rerum minima animi, ipsam ad, odio nam vitae. Delectus error blanditiis fugiat consequatur doloribus officiis eaque numquam corrupti corporis, aliquam omnis esse recusandae, qui nihil, dolor est totam repudiandae? Voluptates explicabo alias enim amet eum facilis harum animi eos labore maiores perferendis asperiores provident sunt ipsam commodi odio, dolorum atque nobis quidem, dignissimos non. Corrupti quibusdam eaque molestiae unde doloribus expedita id minus asperiores saepe dicta. Velit aut alias, ducimus aperiam voluptates et temporibus. Cumque cum alias ipsum, cupiditate eaque iure illum facere saepe, aliquam nesciunt necessitatibus, et deleniti sequi odit sed vero facilis error dolores! Modi voluptatem tempore magnam, eaque ut necessitatibus voluptate laborum velit dolorem! Pariatur ullam officia dolor necessitatibus expedita blanditiis obcaecati nesciunt ex assumenda? Facilis, quidem ad. Excepturi, quaerat voluptatum, quod doloribus, eum perferendis repellendus error aliquam porro possimus nesciunt ab. Excepturi, pariatur incidunt temporibus atque quos animi repellat ex culpa, architecto voluptate nihil veniam assumenda molestias. Consequatur unde quibusdam tempore eligendi, nulla aliquid dolorem molestiae reprehenderit quod provident soluta, temporibus, nam vitae molestias minus nobis harum quis reiciendis repellat officiis delectus. Tempora, assumenda necessitatibus dolore quasi eligendi blanditiis et ipsam doloremque? Ab veritatis doloribus possimus suscipit officiis hic ex libero nobis omnis eius. Saepe, est. Nihil, ratione!
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </ScrollArea>
      </AppShell.Main>

      <AppShell.Footer p="md">
        <Textarea maxRows={6} autosize w="100%"/>
      </AppShell.Footer>

    </AppShell>
  );
}