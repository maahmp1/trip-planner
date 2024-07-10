import {
  MapPin,
  Calendar,
  ArrowRight,
  UserRoundPlus,
  Settings2,
  X,
  AtSign,
  Plus,
} from "lucide-react";
import { FormEvent, useState } from "react";

export function App() {
  const [isGuestInputOpen, setGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState([
    "diego@rocketseat.com",
    "john@acme.com",
  ]);

  function openGuestInput() {
    setGuestInputOpen(true);
  }

  function closeGuestInput() {
    setGuestInputOpen(false);
  }

  function openGuestModal() {
    setIsGuestModalOpen(true);
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if(!email){
      return
    }

    if(emailsToInvite.includes(email)){
      return
    }

    setEmailsToInvite([ 
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset()
    }

    function removeEmailfromInvites(emailToRemove: string){
      const newEmailList = emailsToInvite.filter(invited => invited !== emailToRemove)

      setEmailsToInvite(newEmailList)
    }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full  px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/Logo.svg" alt="plann.er logo" />
          <p className="text-zinc-300 text-lg">
            Invite your friends and plan your next trip!
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input
                disabled={isGuestInputOpen}
                type="text"
                placeholder="Where are you going?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>

            <div className="flex items-center gap-2 ">
              <Calendar className="size-5 text-zinc-400" />
              <input
                disabled={isGuestInputOpen}
                type="text"
                placeholder="When?"
                className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
              />
            </div>

            <div className="w-px h-6 bg-zinc-800"></div>

            {/* change place/date */}
            {isGuestInputOpen ? (
              <button
                onClick={closeGuestInput}
                className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
              >
                Change place/date
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button
                onClick={openGuestInput}
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
              >
                Continue
                <ArrowRight className="size-5 " />
              </button>
            )}
          </div>

          {/* people who are going to the trip*/}
          {isGuestInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button
                type="button"
                onClick={openGuestModal}
                className="flex items-center gap-2 flex-1"
              >
                <UserRoundPlus className="size-5 text-zinc-400" />
                <span className="text-zinc-400 text-lg flex-1 text-left">
                  "Who is going to the trip?"
                </span>
              </button>

              <div className="w-px h-6 bg-zinc-800"></div>

              <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Confirm trip
                <ArrowRight className="size-5 " />
              </button>
            </div>
          )}
        </div>

        <p className="text-sml text-zinc-500">
          By planning your trip on plann.er you automatically agree <br />
          with our{" "}
          <a className="text-zinc-300 underline" href="#">
            {" "}
            user terms
          </a>{" "}
          and{" "}
          <a className="text-zinc-300 underline" href="#">
            {" "}
            privacy politics
          </a>
          .
        </p>
      </div>

      {/* select guests */}
      {isGuestModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Select guests</h2>
                <button onClick={closeGuestModal}>
                  <X className="size-5 bg-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Guests will receive e-mails to confirm their participation in
                the trip
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map((email) => {
                return (
                  <div
                    key={email}
                    className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                  >
                    <span className="text-zinc-300">{email}</span>
                    <button type="button" onClick={() => removeEmailfromInvites(email)}>
                      <X className="size-4 text-zinc-400" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="w-full h-px bg-zinc-800"></div>

            <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2 ">
              <div className="px-2 flex items-center flex-1 gap-2">
                <AtSign className="text-zinc-400 size-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Type your guest e-mail"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>
              <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Invite
                <Plus className="size-5 " />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
