export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      access: {
        Row: {
          created_at: string
          id: string
          is_admin: boolean
          schedule_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_admin?: boolean
          schedule_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_admin?: boolean
          schedule_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "access_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      employees: {
        Row: {
          archived: boolean
          created_at: string
          id: string
          name: string
          phone: string
          schedule_id: string
          user_id: string | null
        }
        Insert: {
          archived?: boolean
          created_at?: string
          id?: string
          name: string
          phone: string
          schedule_id: string
          user_id?: string | null
        }
        Update: {
          archived?: boolean
          created_at?: string
          id?: string
          name?: string
          phone?: string
          schedule_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      employees_stations: {
        Row: {
          archived: boolean
          created_at: string
          employee_id: string
          hour_rate_cents: number | null
          id: string
          schedule_id: string
          station_id: string
        }
        Insert: {
          archived?: boolean
          created_at?: string
          employee_id: string
          hour_rate_cents?: number | null
          id?: string
          schedule_id: string
          station_id: string
        }
        Update: {
          archived?: boolean
          created_at?: string
          employee_id?: string
          hour_rate_cents?: number | null
          id?: string
          schedule_id?: string
          station_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_stations_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_stations_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_stations_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "stations"
            referencedColumns: ["id"]
          },
        ]
      }
      people: {
        Row: {
          address: string | null
          country_id: string | null
          created_at: string
          dob: string | null
          email: string | null
          id: string
          name: string | null
          phone: string | null
          picture: string | null
        }
        Insert: {
          address?: string | null
          country_id?: string | null
          created_at?: string
          dob?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          picture?: string | null
        }
        Update: {
          address?: string | null
          country_id?: string | null
          created_at?: string
          dob?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          picture?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_people_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      public_roles: {
        Row: {
          created_at: string
          id: string
          name: string | null
          public_schedule_id: string | null
          rate_cents: number | null
          required_staff: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          public_schedule_id?: string | null
          rate_cents?: number | null
          required_staff?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          public_schedule_id?: string | null
          rate_cents?: number | null
          required_staff?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "public_roles_public_schedule_id_fkey"
            columns: ["public_schedule_id"]
            isOneToOne: false
            referencedRelation: "public_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      public_schedules: {
        Row: {
          archived: boolean
          closing_time: string
          created_at: string
          id: string
          name: string | null
          open_days: boolean[]
          opening_time: string
          shift_time_0: string | null
          shift_time_1: string | null
          shifts: number
        }
        Insert: {
          archived?: boolean
          closing_time: string
          created_at?: string
          id?: string
          name?: string | null
          open_days: boolean[]
          opening_time: string
          shift_time_0?: string | null
          shift_time_1?: string | null
          shifts: number
        }
        Update: {
          archived?: boolean
          closing_time?: string
          created_at?: string
          id?: string
          name?: string | null
          open_days?: boolean[]
          opening_time?: string
          shift_time_0?: string | null
          shift_time_1?: string | null
          shifts?: number
        }
        Relationships: []
      }
      schedules: {
        Row: {
          archived: boolean
          closing_time: string
          created_at: string
          id: string
          name: string | null
          open_days: boolean[]
          opening_time: string
          shift_time_0: string | null
          shift_time_1: string | null
          shifts: number
        }
        Insert: {
          archived?: boolean
          closing_time: string
          created_at?: string
          id?: string
          name?: string | null
          open_days: boolean[]
          opening_time: string
          shift_time_0?: string | null
          shift_time_1?: string | null
          shifts: number
        }
        Update: {
          archived?: boolean
          closing_time?: string
          created_at?: string
          id?: string
          name?: string | null
          open_days?: boolean[]
          opening_time?: string
          shift_time_0?: string | null
          shift_time_1?: string | null
          shifts?: number
        }
        Relationships: []
      }
      service_types: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image_id: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image_id?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image_id?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_service_types_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["id"]
          },
        ]
      }
      shifts: {
        Row: {
          created_at: string
          ends: string
          id: string
          schedule_id: string
          starts: string
          week_day: number
        }
        Insert: {
          created_at?: string
          ends: string
          id?: string
          schedule_id: string
          starts: string
          week_day: number
        }
        Update: {
          created_at?: string
          ends?: string
          id?: string
          schedule_id?: string
          starts?: string
          week_day?: number
        }
        Relationships: [
          {
            foreignKeyName: "shifts_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      stations: {
        Row: {
          archived: boolean
          created_at: string
          hour_rate_cents: number | null
          id: string
          max: number | null
          min: number
          name: string
          schedule_id: string
        }
        Insert: {
          archived?: boolean
          created_at?: string
          hour_rate_cents?: number | null
          id?: string
          max?: number | null
          min?: number
          name: string
          schedule_id: string
        }
        Update: {
          archived?: boolean
          created_at?: string
          hour_rate_cents?: number | null
          id?: string
          max?: number | null
          min?: number
          name?: string
          schedule_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stations_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_employee_and_link: {
        Args: {
          employee_name: string
          employee_phone: string
          schedule_id: string
        }
        Returns: undefined
      }
      create_schedule_and_access: {
        Args: {
          schedule_name: string
          user_id: string
        }
        Returns: undefined
      }
      has_read_access: {
        Args: {
          p_user_id: string
          p_schedule_id: string
        }
        Returns: boolean
      }
      has_write_access: {
        Args: {
          p_user_id: string
          p_schedule_id: string
        }
        Returns: boolean
      }
      link_employee: {
        Args: {
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
