export type WidgetType = 'hero' | 'quote' | 'frameworks' | 'projects' | 'contact' | 'sustainability' | 'footer';

export interface WidgetData {
  id: string;
  type: WidgetType;
  theme: 'yellow' | 'dark' | 'coral' | 'white';
  content: any;
}

export interface AppConfig {
  header: {
    title: string;
    links: { label: string; url: string }[];
  };
  widgets: WidgetData[];
}
