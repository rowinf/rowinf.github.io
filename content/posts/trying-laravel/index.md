+++
date = '2025-05-01T10:13:47+13:00'
draft = false
title = 'Laravel Livewire Notes'
description = 'it has its quirks, but overall fun to work with'
+++

After a long time as a JavaScript developer, I developed issues with React [noted here]({{< ref "posts/javascript-gripes" >}}). I'm giving Laravel Livewire a try here as a way to step outside of my world and learn another way of doing things with the [Note-taking web app](https://www.frontendmentor.io/challenges/note-taking-web-app-773r7bUfOG).

Recent updates to Laravel I found while undergoing this project:
- New Livewire starter kits to go with Laravel 12
- New VS Code extension for better code hints in Laravel
- Laravel Cloud launched for optimized Laravel deployment

Overall Laravel is a fast path to production with a lively ecosystem and helpful documentation. As someone who has never used PHP before I found the fluid APIs easy to use.

## Technologies Used
- Laravel
- Livewire
- Alpine.js (I knew this one already)
- Flux UI
- Tailwind CSS (I was a little familiar)

Livewire integrates Laravel with Alpine.js via html attributes. It adds reactivity to server-rendered html without quite being a front end framework. Here are some code examples from the project.

## Highlights

Here are the code highlights of some of the key functionality from the project.

### Note List Navigation
Here's a link that is used to navigate between notes. Laravel's Blade syntax is the `@if` and `@foreach` and `{{ $tag->id }}` and `@class` while the Livewire bits are as follows:
- Livewire `wire:navigate` is used for snappy pjax navigation.
- Livewire `wire:current` css classes to use when the current page matches the link's href.
- Livewire `wire:key="{{ $note->id }}"` identifies elements rendered in a loop internally.
- `href="{{ $this->getNoteRoute($note) }}"` uses my livewire component's url function.
- `livewire:notes.note-title` is another Livewire component I pass some data to.
- Alpine.js `x-on:click` hides the "Untitled" note when navigating away from note creation

```html
<div wire:key="{{ $note->id }}" @class([
    'note-list-item has-hover:border-transparent',
    'border-t' => !$loop->first,
])>
    <a href="{{ $this->getNoteRoute($note) }}"
        class="my-1 hover:bg-zinc-100 dark:hover:bg-zinc-700/75 p-2 flex flex-col hover:rounded-md"
        wire:current="bg-zinc-100 dark:bg-zinc-800 rounded-md"
        x-on:click="hideUntitled = true" wire:navigate>
        <livewire:notes.note-title class="font-semibold" wire:key="title_{{ $note->id }}"
            :noteId="$note->id" :title="$note->title"></livewire:notes.note-title>
        @if ($note->tags->isNotEmpty())
            <div class="pt-2">
                @foreach ($note->tags as $tag)
                    <span class="p-1 bg-zinc-200 rounded-md dark:bg-zinc-700 text-xs"
                        wire:key="{{ $tag->id }}">{{ $tag->name }}</span>
                @endforeach
            </div>
        @endif
        @if ($note->last_edited_at)
            <div class="text-xs pt-3">{{ $note->last_edited_at }}</div>
        @endif
    </a>
</div>
```

### Note Title
Note Title uses cross-component communication with events to listen for updates to the note title. It uses the Volt syntax to contain itself in one file. Nesting components is something to avoid, but I had to here.

```php
<?php
use Livewire\Volt\Component;

use Livewire\Attributes\On;
new class extends Component {

    public int $noteId = -1;
    public string $title = '';
    public string $class = '';

    #[On('title-updated.{noteId}')]
    public function titleUpdatedEditor($title)
    {
        $this->title = $title;
    }
}; ?>

<div class="{{ $this->class }}">{{ $this->title ?: "Untitled Note" }}</div>
```

### Global Toasts
I wanted the toasts to remain on the page for example if a note gets deleted and the user redirects to another page. The `@persist` blade directive allows this component to persist across page navigation when using `wire:navigate` but only if the toast is at the root layout. It wasn't obvious what would work and what wouldn't. I used an Alpine store because the template was getting crowded. The starter kit provides a demo toast notification that uses a livewire directive `@this` that didn't seem to work as a global toast. That is, it would have to be colocated with the code that triggers it, and any route change wipes the toast off the screen.
```html
@persist('toast')
<div x-cloak x-data="$store.toasts" class="h-9 absolute bottom-8 right-0 z-100 w-102"
    x-on:click.outside="toast(false)" x-show="isOpen"
    x-transition:enter="transform-[transition] ease-in-out transition duration-500"
    x-transition:enter-start="translate-x-full" x-transition:enter-end="translate-x-0"
    x-transition:leave="transform-[transition] ease-in-out transition duration-500"
    x-transition:leave-start="translate-x-0" x-transition:leave-end="translate-x-full">
    <div class="flex items-center px-2 bg-white dark:bg-zinc-800 border rounded-xl w-96">
        <flux:icon.icon-checkmark class="text-green-500 mr-2 size-5" />
        <p class="dark:text-white text-xs flex-1" x-text="message"></p>
        <flux:button variant="subtle" size="sm" icon="x-mark" x-on:click="toast(false)"></flux:button>
    </div>
</div>
@endpersist
```

## Conclusion

Livewire gives you lots of tools to craft the behavior of an application. It has its quirks, and it's easy to get lost trying to do something it just isn't meant to do. All that said, once you get used to it, it's really easy to work with. I will try the Volt syntax on my next project, it looks even simpler.

That's this project, now on to the next one.

[Laravel Livewire Notes](https://www.frontendmentor.io/solutions/laravel-livewire-notes-85CwNRZkYZ) [github](https://github.com/rowinf/notes)