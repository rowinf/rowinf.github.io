+++
date = '2025-05-01T10:13:47+13:00'
draft = false
title = 'Laravel Livewire Notes'
description = 'it has its quirks, but overall fun to work with'
+++

After a long time as a JavaScript developer, I became disillusioned with React [noted here]({{< ref "posts/javascript-gripes" >}}). I'm looking for a well-designed full-stack framework. Next.js has made a mess of React, and React Server Components are a conceptual "bridge too far" for me. Building the [Note-taking web app](https://www.frontendmentor.io/challenges/note-taking-web-app-773r7bUfOG) with [Laravel](https://laravel.com/) / [Livewire](https://livewire.laravel.com/) was a big step outside of the JavaScript ecosystem.

## Laravel

I chose Laravel because of its mature, cohesive ecosystem lacking in JavaScript. It comes bundled with a starter kit that gets your project off the ground quickly.

### A Thriving Ecosystem

I found that Laravel has a thriving ecosystem full of updates. Some updates to Laravel I saw while undergoing this project:
- The new Livewire starter kit from Laravel 12 got this project started fast.
- A new VS Code extension helped me navigate my Laravel code base.
- Laravel Cloud offers a fast path to production, though I ultimately used [fly.io](https://fly.io)

### Laravel Utilities

The batteries included approach taken by Laravel ensures you can get far before scrounging github for packages, vetting them for star count and compatibility. These utilities generally come with a [Facade or a simpler fluid syntax](https://laravel.com/docs/12.x/facades).

## Livewire

While a front-end framework like React might seem like the obvious choice for this project, my main reasons for choosing Livewire:
- Less Client side code
- Skip JSON APIs, just return HTML
- Progressive-enhancement is baked-in
- No build steps or transpilation for the JavaScript bundle
- Alpine.js handles fine-grained UX requirements

Within Livewire, you get the choice of using a class/template syntax or a more concise [Volt](https://livewire.laravel.com/docs/volt) syntax.

## Shipping Is Easy
Overall Laravel is a fast path to production with a lively ecosystem and helpful documentation. You have multiple deployment providers like laravel cloud, fly.io, and others.

## Technologies Used
- Laravel
- Livewire
- Alpine.js (I knew this one already)
- Flux UI
- Tailwind CSS (I was a little familiar)
- Amazon SES (email)
- Sqlite

## Highlights

Below are some code examples from key parts of the app, showcasing how Laravel and Livewire simplify common UI patterns.

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
Note Title uses cross-component communication with events to listen for updates to the note title. It uses the Volt syntax to contain itself in one file. Normally, nesting Livewire components is discouraged due to performance and complexity concerns—but in this case, it was the most practical solution.

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
I wanted to be able to maintain user feedback across route changes, a common task in single-page apps, often bringing in a mess of dependencies. I have made an Alpine store to provide global state for the toasts. Here, the `@persist` blade directive ensures the toast component isn’t destroyed during `wire:navigate`, which gives it SPA-like persistence.

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

So this global toast works in conjunction with a server round-trip for creating a note:
```php
$note = $this->form->save();
$this->dispatch('note-added', id: $note->id, message: 'Note saved successfully!');
$this->redirect(route('note.show', ['note' => $note]), navigate: true);
```

The php event is handled in the client with a Livewire hook to show the toast after the route change is complete:
```JS
document.addEventListener('livewire:navigated', () => {
    const { deferOpen, message, toast } = Alpine.store('toasts');
    if (deferOpen) {
        toast(message);
    }
});
Livewire.on('note-added', (event) => {
    Alpine.store('toasts').deferToast(event.message);
});
```

{{< aside >}}
The starter kit provides a demo toast notification using a livewire directive "`@this`" that didn't seem to work as a global toast. Also, the paid version of Flux UI has a global toast utility. It's probably simpler than what I did here!
{{< /aside >}}

## Conclusion

Livewire lets you craft the behavior of an application with as much or as little reactivity as you want. It's easy to veer off into patterns it isn't designed for. It's so simple that I'd even use it again on my next project.

### References
- [Front end mentor solution](https://www.frontendmentor.io/solutions/laravel-livewire-notes-85CwNRZkYZ)
- [Project code](https://github.com/rowinf/notes)