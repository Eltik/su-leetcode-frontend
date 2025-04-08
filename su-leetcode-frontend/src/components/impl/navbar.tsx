import Link from "next/link";
import { Button } from "~/components/ui/button";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { LoginDialogue } from "./login-dialogue";
import { useCookies } from "react-cookie";
import { useStore } from "zustand";
import { useUser } from "~/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { StoredUser } from "~/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function Navbar() {
    const [cookies] = useCookies(["login"]);
    const userData = useStore(useUser, (state) => (state as { userData: StoredUser })?.userData);

    return (
        <>
            <Dialog>
                <header className="bg-background-900/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 z-30 w-full border-b shadow backdrop-blur dark:shadow-none">
                    <div className="mx-4 flex h-14 items-center sm:mx-4 md:mx-8 md:ml-32 lg:ml-32">
                        <div className="flex items-center">
                            <SidebarTrigger className="block md:hidden" />
                            <Link href={"/"} className="text-base font-bold">
                                SU Leetcode
                            </Link>
                        </div>
                        <div className="flex flex-1 items-center justify-end space-x-2 lg:mr-14">
                            {cookies.login && playerData && playerData.status !== null && playerData.status !== undefined ? (
                                <>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <div className="hover:bg-secondary flex flex-row rounded-md border px-2 transition-all duration-150">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={""} alt="@shadcn" />
                                                    <AvatarFallback>{playerData.status?.nickName?.slice(0, 1) ?? "E"}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-row items-center gap-2">
                                                    <div className="ml-2 hidden flex-col justify-center md:flex">
                                                        <div className="text-sm font-semibold">{playerData.status?.nickName ?? "Elysium"}</div>
                                                        <div className="text-muted-foreground text-xs">#{playerData.status?.nickNumber ?? "8777"}</div>
                                                    </div>
                                                    <ChevronDown size={15} />
                                                </div>
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <Link href={`/user/${playerData.status.uid}`}>Profile</Link>
                                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={"/statistics"}>Statistics</Link>
                                                    <DropdownMenuShortcut>⇧⌘⌥S</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={"/settings"}>Settings</Link>
                                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <Link href={"https://github.com/Eltik/myrtle"} target="_blank">
                                                        GitHub
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={"#"}>Discord</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem disabled>API</DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link href={"/logout"}>Log Out</Link>
                                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            ) : (
                                <>
                                    <DialogTrigger asChild>
                                        <Button>Login</Button>
                                    </DialogTrigger>
                                    <LoginDialogue />
                                </>
                            )}
                        </div>
                    </div>
                </header>
            </Dialog>
        </>
    );
}
