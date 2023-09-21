import { Card } from "@/components/ui/card";
import Logo from "../assets/Logo.svg";
import {
  TypographyBody1,
  TypographyBody2,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputPair } from "@/components/ui/inputPair";

function DesignSystem() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="container mx-auto px-5 py-24">
        <div className="mb-16 flex flex-col">
          <img className="w-36" src={Logo} alt="Logo" />
          <h1 className="font-sans text-3xl font-light text-primary">
            design system
          </h1>
        </div>
        <div className="flex flex-col gap-16">
          <div className="mb-10 flex flex-col">
            <div className="grid w-max grid-cols-4 gap-x-7 gap-y-12">
              <div className="col-span-1 flex flex-col">
                <div className="mb-5 flex h-20 w-64 items-end rounded bg-red p-2 font-bold text-background">
                  #F87070 - red
                </div>
                <div className="grid grid-cols-[95px_1fr] gap-y-1 text-base text-white">
                  <span className="font-bold ">RGB</span>
                  <span className="font-light opacity-60">248, 112, 112</span>
                  <span className="font-bold">HSL</span>
                  <span className="font-light opacity-60">0°, 91%, 71%</span>
                </div>
              </div>
              <div className="col-span-1 flex flex-col">
                <div className="mb-5 flex h-20 w-64 items-end rounded bg-teal p-2 font-bold text-background">
                  #70F3F8 - teal
                </div>
                <div className="grid grid-cols-[95px_1fr] gap-y-1 text-base text-white">
                  <span className="font-bold ">RGB</span>
                  <span className="font-light opacity-60">112, 243, 248</span>
                  <span className="font-bold">HSL</span>
                  <span className="font-light opacity-60">182°, 91%, 71%</span>
                </div>
              </div>
              <div className="col-span-1 flex flex-col">
                <div className="mb-5 flex h-20 w-64 items-end rounded bg-purple p-2 font-bold text-background">
                  #D881F8 - purple
                </div>
                <div className="grid grid-cols-[95px_1fr] gap-y-1 text-base text-white">
                  <span className="font-bold ">RGB</span>
                  <span className="font-light opacity-60">216, 129, 248</span>
                  <span className="font-bold">HSL</span>
                  <span className="font-light opacity-60">284°, 89%, 74%</span>
                </div>
              </div>
              <div className="col-span-1 flex flex-col">
                <div className="mb-5 flex h-20 w-64 items-end rounded bg-primary p-2 font-bold text-background">
                  #D7E0FF - primary
                </div>
                <div className="grid grid-cols-[95px_1fr] gap-y-1 text-base text-white">
                  <span className="font-bold ">RGB</span>
                  <span className="font-light opacity-60">215, 224, 255</span>
                  <span className="font-bold">HSL</span>
                  <span className="font-light opacity-60">227°, 100%, 92%</span>
                </div>
              </div>
              <div className="col-span-1 flex flex-col">
                <div className="mb-5 flex h-20 w-64 items-end rounded border border-background-contrast bg-background p-2 font-bold text-background-contrast">
                  #1E213F - background
                </div>
                <div className="grid grid-cols-[95px_1fr] gap-y-1 text-base text-white">
                  <span className="font-bold ">RGB</span>
                  <span className="font-light opacity-60">30, 33, 63</span>
                  <span className="font-bold">HSL</span>
                  <span className="font-light opacity-60">235°, 35%, 18%</span>
                </div>
              </div>
              <div className="col-span-1 flex flex-col">
                <div className="mb-5 flex h-20 w-64 items-end rounded bg-white p-2 font-bold text-background">
                  #FFFFFF - white
                </div>
                <div className="grid grid-cols-[95px_1fr] gap-y-1 text-base text-white">
                  <span className="font-bold ">RGB</span>
                  <span className="font-light opacity-60">255, 255, 255</span>
                  <span className="font-bold">HSL</span>
                  <span className="font-light opacity-60">0°, 0%, 100%</span>
                </div>
              </div>
              <div className="col-span-1 flex flex-col">
                <div className="mb-5 flex h-20 w-64 items-end rounded bg-off-white p-2 font-bold text-background">
                  #EFF1FA - off-white
                </div>
                <div className="grid grid-cols-[95px_1fr] gap-y-1 text-base text-white">
                  <span className="font-bold ">RGB</span>
                  <span className="font-light opacity-60">239, 241, 250</span>
                  <span className="font-bold">HSL</span>
                  <span className="font-light opacity-60">229°, 52%, 96%</span>
                </div>
              </div>
              <div className="col-span-1 flex flex-col">
                <div className="border-contrast mb-5 flex h-20 w-64 items-end rounded border bg-midnight p-2 font-bold text-background-contrast">
                  #161932 - midnight
                </div>
                <div className="grid grid-cols-[95px_1fr] gap-y-1 text-base text-white">
                  <span className="font-bold ">RGB</span>
                  <span className="font-light opacity-60">22, 25, 50</span>
                  <span className="font-bold">HSL</span>
                  <span className="font-light opacity-60">234°, 39%, 14%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {/* Font Area */}
            <div className="flex max-w-5xl text-7xl leading-[5.5rem] tracking-[-0.275rem] text-primary">
              {/* Font Families */}
              <div className="flex-1">
                <div className="mb-12 h-1 w-16 bg-red" />
                <div className="font-sans font-bold">Kumbh Sans</div>
              </div>
              <div className="flex-1">
                <div className="mb-12 h-1 w-16 bg-teal" />
                <div className="font-roboto-slab font-bold">Roboto Slab</div>
              </div>
              <div className="flex-1">
                <div className="mb-12 h-1 w-16 bg-purple" />
                <div className="font-mono">Space Mono</div>
              </div>
            </div>
            <div className="mt-28 flex">
              {/* Font Element Types */}
              <div className="flex w-1/2 flex-col gap-6">
                <div className="text-base font-light leading-5 text-white opacity-60">
                  H1 | Bold; 100px; 120px line; -5px Character
                </div>
                <TypographyH1 className="text-primary">Dolor Sit</TypographyH1>
                <div className="text-base font-light leading-5 text-white opacity-60">
                  H2 | Bold; 28px; 34px line
                </div>
                <div className="text-primary">
                  <TypographyH2>Lorem ipsum dolor sit amet</TypographyH2>
                </div>
                <div className="text-base font-light leading-5 text-white opacity-60">
                  H3 | Bold; 16px; 19px line; 15px Character; All Caps
                </div>
                <div className="text-primary">
                  <TypographyH3>consectetuer eli</TypographyH3>
                </div>
                <div className="text-base font-light leading-5 text-white opacity-60">
                  H4 | Bold; 13px; 16px line; 5px Character; All Caps
                </div>
                <div className="text-primary">
                  <TypographyH4>Morbi in sem quis dui placerat or</TypographyH4>
                </div>
              </div>
              <div className="flex w-1/2 flex-col gap-6">
                <div className="text-base font-light leading-5 text-white opacity-60">
                  Body 1 | Bold; 14px; 18px line
                </div>
                <div className="text-primary">
                  <TypographyBody1>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In
                    nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed
                    pretium, ligula sollicitudin laoreet viverra, tortor libero
                    sodales leo, eget blandit nunc tortor eu nibh. Nullam
                    mollis. Ut justo. Suspendisse potenti.
                  </TypographyBody1>
                  <br />
                  <TypographyBody1>
                    Sed egestas, ante et vulputate volutpat, eros pede semper
                    est, vitae luctus metus libero eu augue. Morbi purus libero,
                    faucibus adipiscing, commodo quis, gravida id, est. Sed
                    lectus. Praesent elementum hendrerit tortor. Sed semper
                    lorem at felis. Vestibulum volutpat, lacus a ultrices
                    sagittis, mi neque euismod dui, eu pulvinar nunc sapien
                    ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et,
                    dapibus sed, urna.
                  </TypographyBody1>
                </div>
                <div className="text-base font-light leading-5 text-white opacity-60">
                  Body 2 | Bold; 12px; 14px line
                </div>
                <div className="text-primary">
                  <TypographyBody2>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In
                    nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed
                    pretium, ligula sollicitudin laoreet viverra, tortor libero
                    sodales leo, eget blandit nunc tortor eu nibh. Nullam
                    mollis. Ut justo. Suspendisse potenti.
                  </TypographyBody2>
                  <br />
                  <TypographyBody2>
                    Sed egestas, ante et vulputate volutpat, eros pede semper
                    est, vitae luctus metus libero eu augue. Morbi purus libero,
                    faucibus adipiscing, commodo quis, gravida id, est. Sed
                    lectus. Praesent elementum hendrerit tortor. Sed semper
                    lorem at felis. Vestibulum volutpat, lacus a ultrices
                    sagittis, mi neque euismod dui, eu pulvinar nunc sapien
                    ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et,
                    dapibus sed, urna.
                  </TypographyBody2>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-7">
            {/* Form Area */}
            <Card className="h-[22rem] w-[22rem] bg-background-foreground">
              {/* Button area */}
              <p className="text-base font-light text-white opacity-60">
                Button Default
              </p>
              <Button>Apply</Button>
              <p className="text-base font-light text-white opacity-60">
                Button Hover
              </p>
              <Button className="bg-pale-red">Apply</Button>
            </Card>
            <Card className="h-[22rem] w-[22rem]">
              <p className="text-base font-light text-background opacity-60">
                Form Default
              </p>
              <InputPair>
                <Label htmlFor="pomodoro">pomodoro</Label>
                <Input type="number" id="pomodoro" />
              </InputPair>

              <p className="text-base font-light text-background opacity-60">
                Form Hover
              </p>
              <InputPair>
                <Label htmlFor="pomodoro">pomodoro</Label>
                <Input type="number" id="pomodoro" />
              </InputPair>
            </Card>
            <Card className="h-[22rem] w-[22rem]"></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignSystem;
