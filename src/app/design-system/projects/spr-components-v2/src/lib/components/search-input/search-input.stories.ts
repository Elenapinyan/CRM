import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ValidatorsKeys } from '../../shared/enums/validators.enum';
import { DsSearchInputComponent } from './search-input';

const formControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });

interface CustomArgs {
  formControl: FormControl;
  restrictBySelector: boolean;
  withSearchIcon: boolean;
}

const meta: Meta<DsSearchInputComponent & CustomArgs> = {
  title: 'shared components/Search Input',
  component: DsSearchInputComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Input** component allows users to enter and edit text. It supports various configurations to enhance its usability and appearance.

- **contentSelector**: Css selector to filter nodes for search. (by default all document)
- **matchCase**: Is search sensiteve to case.
- **scrollToActiveMatch**: Adjust the size of the input control to fit different form layouts.
- **controlSize**: Scroll to active match on change it.
- **isColored**: Change the color of the input control based on its state (default false).
- **placeholder**: The text to display as the placeholder for the input.
- **label** and **description**: Display a label and description to guide users.
- **tooltip**: Provide additional information through a tooltip.
- **isDisabled**: Option to disable the component, preventing user interaction.
- **errorMessages**: Custom error messages for validation.

### Usage Example:
\`\`\`html
<ds-search-input
  placeholder="search"
  [formControl]="formControl"
  >
</ds-search-input>
\`\`\`
#### For advanced options check example below

### Default options.
####You can change default option by provide custom value for **SEARCH_INPUT_DEFAULT_OPTIONS** token:

\`\`\`typescript
providers: [
  {
    provide: SEARCH_INPUT_DEFAULT_OPTIONS,
    useValue: {
      placeholder: '',
      matchCase: false,
      scrollToActiveMatch: false,
    }
  }
]
\`\`\`
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    controlSize: {
      options: ['sm', 'md'],
      control: {
        type: 'select',
      },
      description: 'Adjust the size of the input control.',
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    inputId: {
      description: 'This is equivalent to the basic HTML id attribute.',
    },
    isClientSearchNavigation: {
      description: 'Toggle the client search logic with highlight and navigation controls',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    isDisabled: {
      description: 'Disable the input to prevent user interactions.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    matchCase: {
      description: 'Is search sensitive to case',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    scrollToActiveMatch: {
      description: 'Scroll to match when toggle active match',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    withSearchIcon: {
      description: 'Show/hide search icon in prependContent (only for storybook preview)',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    restrictBySelector: {
      description: 'Search only with search-1 attribute',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    label: {
      description: 'The text to display as the label for the input.',
    },
    description: {
      description: 'The text to display as the description for the input.',
    },
    tooltip: {
      description: 'The text to display within the tooltip.',
    },
    tooltipClassForLabel: {
      description: 'Tooltip class for label.',
      control: { type: 'text' },
    },
    isColored: {
      description: 'Option to apply colored styling to the input field.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    placeholder: {
      description: 'The text to display as the placeholder for the input.',
    },
    formControl: {
      table: { disable: true },
    },
    errorMessages: {
      description: 'Custom error messages for validation.',
    },
  },
};

export const Input: StoryObj<DsSearchInputComponent & CustomArgs> = {
  args: {
    label: 'Label',
    isClientSearchNavigation: true,
    withSearchIcon: true,
    placeholder: 'Search',
    restrictBySelector: false,
    description: 'Description',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'ds-component',
    controlSize: 'md',
    matchCase: false,
    scrollToActiveMatch: false,
    formControl,
    isDisabled: false,
    isColored: false,
    errorMessages: {
      [ValidatorsKeys.Required]: 'This field is required',
    },
    inputId: '999',
  },
  render: (args) => {
    if (args.isDisabled) {
      args.formControl.disable({ emitEvent: false });
    } else {
      args.formControl.enable({ emitEvent: false });
    }

    return {
      props: {
        ...args,
      },
      template: `
      <ds-search-input
          [errorMessages]="errorMessages"
          [isClientSearchNavigation]="isClientSearchNavigation"
          [contentSelector]="restrictBySelector ? '[search-1]' : undefined"
          [placeholder]="placeholder"
          [description]="description"
          [formControl]="formControl"
          [isColored]="isColored"
          [controlSize]="controlSize"
          [matchCase]="matchCase"
          [scrollToActiveMatch]="scrollToActiveMatch"
          [label]="label"
          [tooltip]="tooltip"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [inputId]="inputId"
          >
          @if(withSearchIcon) {
            <i class="ds-icon ds-icon-control-search"
              prependContent></i>
          }
        </ds-search-input>

        <br />
        <div class="content" style="height: 300px">
          <h2>WITH search-1 attr</h2>
          <p search-1>
            Zigzagoon raichu shuckle chandelure cascoon bibarel grumpig whismur tentacruel plusle mesprit! Chikorita shellos palpitoad carvanha
            psyduck hoothoot metagross raichu chandelure basculin whirlipede. Kyurem ninjask weavile flareon unown ferrothorn pignite wurmple
            trubbish zekrom. Gible cofagrigus solosis marill slowking beedrill beartic uxie mothim tirtouga heracross scolipede. Numel persian
            cinccino drifblim cherrim goldeen plusle raichu farfetch.
          </p>
          <h2>WITHOUT search-1 attr</h2>
          <p>
            Combusken lillipup xatu gigalith! Munchlax cryogonal spoink ralts clefable golduck mamoswine raticate bidoof zorua servine machoke
            klinklang! Persian combee arcanine cherubi sentret armaldo sigilyph roserade loudred rattata. Rampardos seaking lampent infernape,
            murkrow starly! Pineco, crawdaunt persian virizion aron panpour chandelure seviper fearow nincada. Scraggy qwilfish the glaceon.
            Darkrai mantine farfetch mismagius arbok, darumaka simisear staryu timburr togetic gigalith gengar omastar. Sawsbuck koffing dustox
            hitmonchan azelf minccino accelgor oshawott golett swalot floatzel chimecho. Rapidash shinx feebas, roggenrola raikou carracosta
            cacnea.
          </p>
          <p>
            Magmortar azelf granbull castform deerling pidgey snubbull slowbro wailord, onix chatot! Burmy deoxys cryogonal lotad. Jynx absol
            venomoth lunatone leavanny meganium. Vespiquen togepi wailord spheal shuckle stoutland ninjask lopunny loudred. Bulbasaur mightyena
            cherrim cacnea nidorino metagross golem! Misdreavus beldum voltorb wigglytuff caterpie emolga mewtwo poochyena uxie. Feebas, the
            darumaka dugtrio. Dragonite alomomola piplup exeggutor rapidash vileplume vibrava chingling misdreavus magnezone hitmonchan crobat
            pansage. Bellsprout carnivine farfetch arbok, uxie marshtomp kricketot garchomp lucario. Tornadus swinub yamask oshawott cubchoo
            noctowl roserade metang mime. Abomasnow rhydon deerling grumpig weezing.
          </p>
          <p>
            Ledian sudowoodo lilligant swinub espeon karrablast, graveler pinsir meganium taillow. Arbok starmie noctowl vaporeon vibrava
            ferrothorn yanma. Pupitar volcarona serperior cacturne gothitelle scrafty woobat staravia goldeen zangoose dragonite. Sealeo spiritomb
            typhlosion swalot. Meganium azumarill ponyta ducklett and plusle pidgeot exeggutor zoroark simisage camerupt. Grumpig shroomish
            finneon zorua, whiscash houndoom kirlia cryogonal vanillish shelmet! Rufflet magmar regigigas spinarak tirtouga abra seedot chingling?
            Seviper psyduck vespiquen tranquill, mantine phanpy. Landorus keldeo heatran, grotle cherrim darumaka. Magby golem mewtwo.
          </p>
          <p>
            Cubone; conkeldurr larvesta marowak golett? Magikarp azumarill hitmonlee donphan chatot seviper seadra meditite seismitoad meganium
            durant electrode bouffalant. Delcatty tranquill koffing, spearow sudowoodo piloswine. Sentret delibird wobbuffet dusclops arbok,
            wobbuffet carracosta. Panpour cacturne swellow, wartortle shellder exeggutor kingdra seviper jynx mime ursaring electrike. Dustox
            charizard lotad gardevoir hoothoot cleffa munchlax dustox, klinklang aggron fearow.
          </p>
          <p>
            Ledyba chimchar sentret genesect braviary altaria genesect smeargle bayleef blissey hoothoot. Magnezone growlithe mawile infernape
            swalot sneasel lugia dunsparce? Smeargle grimer fraxure hoothoot shroomish. Tauros wurmple snivy krabby dragonite kricketot, gible
            breloom. Teddiursa vileplume hoppip whiscash snover. Ariados wooper torterra venusaur reuniclus amoonguss wurmple onix roggenrola
            charmander! Lairon tynamo pawniard meganium psyduck linoone silcoon carvanha krokorok togekiss groudon. Vaporeon, conkeldurr omanyte
            musharna! Mienfoo cacnea lotad gallade vanillite squirtle seismitoad tyranitar zapdos cascoon gulpin dratini. Shedinja ivysaur hypno
            roggenrola klang ferroseed shedinja dugtrio. Pidgeotto venipede.
          </p>
          <p>
            Yamask galvantula ledyba crawdaunt liepard. Duskull blitzle empoleon sewaddle fraxure farfetch sceptile mr? Vespiquen sigilyph skorupi
            vulpix hitmonlee magneton roserade garbodor aerodactyl luxio meloetta rampardos ralts? Abra sandshrew cleffa empoleon lillipup
            piloswine magneton sentret poochyena. Goldeen accelgor blissey mawile staravia wynaut machop snover magnezone huntail. Pineco dodrio
            leafeon koffing marill. Palpitoad smoochum blastoise scraggy unown wurmple. Probopass dugtrio ludicolo zapdos kakuna linoone poliwrath
            scyther hoothoot stoutland rhyhorn sableye charmander. Tangrowth charmander gyarados wingull reshiram nidoking.
          </p>
          <p>
            Solrock mightyena mawile gothita golduck meloetta togetic wurmple ledian elekid eevee. Pineco pidgeot thundurus kirlia cofagrigus
            buizel accelgor exeggutor goldeen froslass yanma kabuto volcarona. Dusclops graveler jirachi jumpluff graveler kabuto seviper pupitar
            pachirisu. Baltoy rhyperior jolteon ledyba treecko electrode heatmor magmortar. Aggron bulbasaur minun ledian sealeo gorebyss seel
            dialga pachirisu.
          </p>
          <p>
            Scrafty galvantula of crawdaunt krabby lillipup petilil cascoon. Rampardos regirock deino magnemite burmy klang remoraid gastly
            meganium diglett swinub togekiss. Torterra tynamo liepard drifblim pignite lilligant virizion servine glalie deino lumineon nidoran
            ninjask. Nuzleaf togekiss butterfree jolteon. Buizel shelmet bronzor marshtomp, metapod terrakion lotad shedinja wailord mandibuzz.
            Sceptile lotad sandslash metang voltorb blaziken corphish. Gothorita venonat lotad azumarill krabby umbreon gardevoir altaria starmie
            kricketot maractus blitzle. Tranquill mew ferrothorn primeape mime and woobat. Ekans heatran terrakion graveler klinklang, heracross
            deerling magmar taillow! Venusaur happiny happiny glaceon!
          </p>
          <p>
            Boldore togekiss rayquaza wingull wynaut purrloin ekans magmortar chikorita grovyle heatmor scraggy. Golem quilava rapidash conkeldurr
            machop sudowoodo archen pidove chansey abra shelgon, vulpix raichu. Illumise togepi heracross tranquill infernape gardevoir
            wigglytuff? Munna arbok solrock heatran staraptor. Torterra jynx pansage muk, feebas blitzle combee nuzleaf ho omastar mankey hoppip
            chimecho. Samurott oshawott jigglypuff luxray, spinarak cacturne vespiquen. Vanillish, tangela sewaddle zebstrika rampardos venomoth.
            Spheal charmander teddiursa slowbro wailmer amoonguss. Hydreigon togekiss vaporeon pidove tentacool kirlia hariyama ralts tangrowth
            regigigas chimecho golett. Leavanny tentacool lickilicky clefable.
          </p>
        </div>
      `,
    };
  },
};

export default meta;
