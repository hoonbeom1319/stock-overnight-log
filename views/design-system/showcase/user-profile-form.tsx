'use client';

import { Button } from '@/design-system/input/button';
import { Input } from '@/design-system/input/input';
import { RadioGroup, RadioGroupItem } from '@/design-system/input/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/design-system/input/select';
import { TextArea } from '@/design-system/input/text-area';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/design-system/navigation/context-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/design-system/navigation/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from '@/design-system/navigation/navigation-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/design-system/surface/table';

export function UserProfileFormShowcase() {
    return (
        <div className="space-y-8">
            <div className="rounded-2xl border bg-white p-6">
                <p className="text-muted-foreground text-xs font-medium tracking-wide">STITCH SHOWCASE</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">User Profile Form</h1>
                <p className="text-muted-foreground mt-2 text-sm">
                    Stitch 결과물을 기준으로 `@design-system` 컴포넌트를 조합한 검토용 화면입니다.
                </p>
            </div>

            <section className="space-y-4 rounded-2xl border bg-white p-6">
                <h2 className="text-lg font-semibold">General Info</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                        <span className="text-muted-foreground text-sm font-medium">Full Name</span>
                        <Input placeholder="Alex Sterling" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-muted-foreground text-sm font-medium">Work Title</span>
                        <Select defaultValue="lead-curator">
                            <SelectTrigger>
                                <SelectValue placeholder="직책 선택" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="lead-curator">Lead Curator</SelectItem>
                                <SelectItem value="system-architect">System Architect</SelectItem>
                                <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                            </SelectContent>
                        </Select>
                    </label>
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-muted-foreground text-sm font-medium">Biography</span>
                        <TextArea placeholder="Briefly describe your role and expertise..." rows={4} />
                    </label>
                </div>
            </section>

            <section className="space-y-4 rounded-2xl border bg-white p-6">
                <h2 className="text-lg font-semibold">Preferences</h2>
                <fieldset className="space-y-3">
                    <legend className="text-muted-foreground text-sm font-medium">Workspace Visibility</legend>
                    <RadioGroup defaultValue="private" className="grid gap-3 md:grid-cols-2">
                        <label className="flex items-center gap-3 rounded-xl bg-secondary-100 p-3">
                            <RadioGroupItem value="public" id="visibility-public" />
                            <span className="text-white">Public</span>
                        </label>
                        <label className="flex items-center gap-3 rounded-xl bg-secondary-100 p-3">
                            <RadioGroupItem value="private" id="visibility-private" />
                            <span className="text-white">Private</span>
                        </label>
                    </RadioGroup>
                </fieldset>
            </section>

            <section className="space-y-4 rounded-2xl border bg-white p-6">
                <h2 className="text-lg font-semibold">Navigation & Menu Samples</h2>
                <div className="flex flex-wrap items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Sign out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <ContextMenu>
                        <ContextMenuTrigger asChild>
                            <div className="rounded-lg bg-secondary-100 px-3 py-2 text-sm text-white">Right click here</div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuItem>Open details</ContextMenuItem>
                            <ContextMenuItem>Duplicate</ContextMenuItem>
                            <ContextMenuItem>Archive</ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                </div>

                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuPrimitiveItem title="Dashboard" description="Overview and key metrics" />
                        <NavigationMenuPrimitiveItem title="Reports" description="Detailed analytics and exports" />
                    </NavigationMenuList>
                </NavigationMenu>
            </section>

            <section className="space-y-4 rounded-2xl border bg-white p-6">
                <h2 className="text-lg font-semibold">Recent Activity Table</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Updated</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Alex Sterling</TableCell>
                            <TableCell>Lead Curator</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>2026-04-16 10:20</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Mina Kim</TableCell>
                            <TableCell>Compliance Officer</TableCell>
                            <TableCell>Pending</TableCell>
                            <TableCell>2026-04-16 09:55</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
        </div>
    );
}

function NavigationMenuPrimitiveItem({ title, description }: { title: string; description: string }) {
    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
            <NavigationMenuContent>
                <NavigationMenuLink href="#" className="w-72">
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-1 text-xs text-secondary-700">{description}</p>
                </NavigationMenuLink>
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
}
