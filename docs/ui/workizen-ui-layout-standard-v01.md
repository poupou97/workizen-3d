# Workizen UI Layout Standard

Status: Active  
Project: Workizen 3D  
Date: 2026-06-08

## Purpose

This standard defines the approved UI direction for Workizen 3D as the project moves toward Workizen HQ Island.

## Core Rule

World first, UI second.

The 3D world should occupy at least 80% of perceived attention. UI should help users orient, select, and inspect the world without becoming the primary visual experience.

## Top Hero Rule

The top hero card must be minimized or removed after initial load.

The opening title can establish identity, but it should not permanently block major world content or compete with the island composition.

## Bottom Navigation Rule

The main menu should move to bottom navigation in future implementation.

Approved bottom navigation items:

- Home
- Citizens
- Districts
- Opportunities
- Marketplace
- Knowledge

Bottom navigation should be compact, readable, and bright. It should use the white/glass style from `artDirection.ts`.

## Information Panel Behavior

Information panels should behave as follows:

- Hidden by default
- Appears only after selection
- Compact left-side card
- Short description only
- No duplicate long explanation

Selection panels should explain what the user selected without blocking the main world view.

## Right Panel Rule

A right panel should not permanently block the scene unless the user enters an explicit detail mode.

The default experience should keep the island visible and allow users to understand the world through the scene itself.

## Card Style

Cards should use the bright glass/white style from `artDirection.ts`:

- White or glass-like surface
- Blue-green accents
- Soft shadow
- Readable dark text
- Light borders

Avoid heavy dark blocks, full-height permanent panels, or dense text cards that make the scene feel secondary.

## Mobile Rule

Mobile should use bottom sheet behavior.

Bottom sheets should appear only when needed, keep content concise, and allow users to dismiss them quickly to return to the world.

## Acceptance Criteria

- World remains visually dominant.
- Navigation is planned for the bottom, not large top blocks.
- Detail appears only after user selection.
- Detail appears as compact left card on desktop and bottom sheet on mobile.
- UI uses bright Workizen glass/white style.
- UI does not duplicate the same explanation in multiple large panels.
