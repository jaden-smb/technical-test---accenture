import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'relativeTime', pure: true, standalone: false })
export class RelativeTimePipe implements PipeTransform {
  transform(value: string): string {
    const now = Date.now();
    const date = new Date(value).getTime();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 30) return `${diffDay}d ago`;
    return new Date(value).toLocaleDateString();
  }
}
