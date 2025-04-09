import Head from "next/head";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Lightbulb, Code, ChevronDown, ChevronUp, Settings } from "lucide-react";

export default function Home() {
    const [userName, setUserName] = useState("User");
    const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
    const [showHints, setShowHints] = useState(false);
    const [solution, setSolution] = useState("");

    // Mock data for demonstration
    const problem = {
        title: "Two Sum",
        difficulty: "Easy",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
        parameters: [
            { name: "nums", type: "number[]", description: "Array of integers" },
            { name: "target", type: "number", description: "Target sum" },
        ],
        hints: ["Try using a hash map to store the complement of each number", "For each number, check if its complement exists in the hash map", "If found, return the current index and the complement's index"],
    };

    // Get difficulty badge styles based on theme
    const getDifficultyBadgeStyle = (difficulty: string) => {
        switch (difficulty) {
            case "Easy":
                return "bg-success/20 text-success";
            case "Medium":
                return "bg-warning/20 text-warning";
            case "Hard":
                return "bg-destructive/20 text-destructive";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    return (
        <>
            <Head>
                <title>LeetCode Practice</title>
                <meta name="description" content="Practice LeetCode problems" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src="/avatar.png" alt={userName} />
                            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Welcome, {userName}</h1>
                            <div className="flex items-center gap-2">
                                <Code className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">Practicing in: {selectedLanguage}</span>
                            </div>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setSelectedLanguage("JavaScript")}>JavaScript</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedLanguage("Python")}>Python</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedLanguage("Java")}>Java</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Problem Section */}
                    <div className="bg-card rounded-lg border p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-foreground">{problem.title}</h2>
                            <span className={`rounded-full px-3 py-1 text-sm font-medium ${getDifficultyBadgeStyle(problem.difficulty)}`}>{problem.difficulty}</span>
                        </div>

                        <div className="mb-6">
                            <h3 className="mb-2 text-lg font-semibold text-foreground">Description</h3>
                            <p className="text-muted-foreground">{problem.description}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="mb-2 text-lg font-semibold text-foreground">Parameters</h3>
                            <div className="rounded-md bg-muted p-4">
                                {problem.parameters.map((param, index) => (
                                    <div key={index} className="mb-2">
                                        <code className="font-mono text-sm text-primary">
                                            {param.name}: {param.type}
                                        </code>
                                        <p className="text-sm text-muted-foreground">{param.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Collapsible open={showHints} onOpenChange={setShowHints}>
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-amber-50 px-4 py-2 text-amber-800 hover:bg-amber-100">
                                <div className="flex items-center gap-2">
                                    <Lightbulb className="h-5 w-5" />
                                    <span>Hints</span>
                                </div>
                                {showHints ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-2 rounded-md bg-warning/10 p-4">
                                <ul className="list-inside list-decimal space-y-2 text-warning-foreground">
                                    {problem.hints.map((hint, index) => (
                                        <li key={index}>{hint}</li>
                                    ))}
                                </ul>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>

                    {/* Solution Section */}
                    <div className="bg-card rounded-lg border p-6 shadow-sm">
                        <h2 className="mb-4 text-2xl font-bold text-foreground">Your Solution</h2>
                        <div className="mb-4">
                            <Label className="mb-1" htmlFor="language">
                                Language
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {selectedLanguage}
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setSelectedLanguage("JavaScript")}>JavaScript</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSelectedLanguage("Python")}>Python</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSelectedLanguage("Java")}>Java</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="solution">Code</Label>
                            <textarea 
                                id="solution" 
                                className="min-h-[300px] w-full rounded-md border border-input bg-background p-4 font-mono text-sm text-foreground" 
                                placeholder={`// Write your ${selectedLanguage} solution here`} 
                                value={solution} 
                                onChange={(e) => setSolution(e.target.value)} 
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline">Reset</Button>
                            <Button>Submit</Button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
