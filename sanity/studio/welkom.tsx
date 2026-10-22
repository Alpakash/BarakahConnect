'use client'

import { AddIcon, HomeIcon } from '@sanity/icons'
import { Box, Button, Card, Container, Flex, Heading, Stack, Text } from '@sanity/ui'
import { definePlugin } from 'sanity'
import { useIntentLink } from 'sanity/router'

// Startscherm van de Studio: de redacteur komt hier binnen en ziet meteen hoe je een bijeenkomst
// online zet. Staat als eerste tool, dus de Studio opent hierop.
function KnopNaar({ text, icon, intent, params, tone }: {
  text: string
  icon: React.ComponentType
  intent: 'create' | 'edit'
  params: Record<string, string>
  tone?: 'primary' | 'default'
}) {
  const { href, onClick } = useIntentLink({ intent, params })
  return (
    <Button as="a" href={href} onClick={onClick} text={text} icon={icon} tone={tone} mode={tone === 'primary' ? 'default' : 'ghost'} padding={4} fontSize={2} />
  )
}

const STAPPEN = [
  ['Klik op "Nieuwe bijeenkomst"', 'Je krijgt een leeg formulier.'],
  ['Vul het formulier in', 'Alleen de titel is verplicht. Weet je de datum nog niet? Laat hem leeg, dan staat er "Nader te bepalen".'],
  ['Klik rechtsonder op "Publiceren"', 'Pas dan staat de bijeenkomst op de website. Tot die tijd is het een concept; je wijzigingen worden vanzelf bewaard.'],
] as const

function Welkom() {
  return (
    <Card height="fill" overflow="auto" tone="transparent">
      <Container width={1} paddingX={4} paddingY={6}>
        <Stack space={5}>
          <Stack space={3}>
            <Heading as="h1" size={3}>Welkom bij Barakah Connect</Heading>
            <Text muted size={2}>Hier beheer je de inhoud van de website.</Text>
          </Stack>

          <Flex gap={3} wrap="wrap">
            <KnopNaar text="Nieuwe bijeenkomst" icon={AddIcon} intent="create" params={{ type: 'event' }} tone="primary" />
            <KnopNaar text="Nieuwe spreker" icon={AddIcon} intent="create" params={{ type: 'speaker' }} />
          </Flex>

          <Card padding={4} radius={3} shadow={1}>
            <Stack space={4}>
              <Heading as="h2" size={1}>Zo zet je een webinar of bijeenkomst online</Heading>
              {STAPPEN.map(([titel, uitleg], i) => (
                <Flex key={titel} gap={3}>
                  <Box flex="none"><Text size={2} weight="bold">{i + 1}.</Text></Box>
                  <Stack space={2}>
                    <Text size={2} weight="semibold">{titel}</Text>
                    <Text size={1} muted>{uitleg}</Text>
                  </Stack>
                </Flex>
              ))}
            </Stack>
          </Card>

          <Stack space={3}>
            <Text size={1} muted>
              Iets aanpassen of weghalen? Klik bovenaan op &quot;Inhoud&quot; en dan op &quot;Bijeenkomsten&quot;. Een
              bijeenkomst waarvan de datum voorbij is, verdwijnt vanzelf van de website.
            </Text>
            <Text size={1} muted>
              Teksten van de pagina&apos;s zelf (Home, Over ons, Contact…) staan onder &quot;Inhoud&quot; →
              &quot;Website-teksten&quot;.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Card>
  )
}

export const welkomTool = definePlugin({
  name: 'welkom',
  tools: [{ name: 'welkom', title: 'Start', icon: HomeIcon, component: Welkom }],
})
