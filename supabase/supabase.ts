export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      investments: {
        Row: {
          amount_invested: number
          created_at: string | null
          id: number
          investment_date: string
          mutual_fund_id: number | null
          mutual_fund_name: string | null
          nav_at_investment: number
          returns: number
        }
        Insert: {
          amount_invested: number
          created_at?: string | null
          id?: number
          investment_date: string
          mutual_fund_id?: number | null
          mutual_fund_name?: string | null
          nav_at_investment: number
          returns: number
        }
        Update: {
          amount_invested?: number
          created_at?: string | null
          id?: number
          investment_date?: string
          mutual_fund_id?: number | null
          mutual_fund_name?: string | null
          nav_at_investment?: number
          returns?: number
        }
        Relationships: [
          {
            foreignKeyName: "investments_mutual_fund_id_fkey"
            columns: ["mutual_fund_id"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investments_mutual_fund_name_fkey"
            columns: ["mutual_fund_name"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["fund_name"]
          },
        ]
      }
      market_cap_allocations: {
        Row: {
          cap_type: string | null
          created_at: string | null
          id: number
          mutual_fund_id: number | null
          percentage: number | null
        }
        Insert: {
          cap_type?: string | null
          created_at?: string | null
          id?: number
          mutual_fund_id?: number | null
          percentage?: number | null
        }
        Update: {
          cap_type?: string | null
          created_at?: string | null
          id?: number
          mutual_fund_id?: number | null
          percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "market_cap_allocations_mutual_fund_id_fkey"
            columns: ["mutual_fund_id"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["id"]
          },
        ]
      }
      mutual_funds: {
        Row: {
          created_at: string | null
          current_nav: number | null
          fund_name: string
          id: number
          isn: string
        }
        Insert: {
          created_at?: string | null
          current_nav?: number | null
          fund_name: string
          id?: number
          isn: string
        }
        Update: {
          created_at?: string | null
          current_nav?: number | null
          fund_name?: string
          id?: number
          isn?: string
        }
        Relationships: []
      }
      sector_allocations: {
        Row: {
          created_at: string | null
          id: number
          mutual_fund_id: number | null
          percentage: number | null
          sector: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          mutual_fund_id?: number | null
          percentage?: number | null
          sector: string
        }
        Update: {
          created_at?: string | null
          id?: number
          mutual_fund_id?: number | null
          percentage?: number | null
          sector?: string
        }
        Relationships: [
          {
            foreignKeyName: "sector_allocations_mutual_fund_id_fkey"
            columns: ["mutual_fund_id"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_allocations: {
        Row: {
          created_at: string | null
          id: number
          mutual_fund_id: number | null
          percentage: number | null
          stock_name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          mutual_fund_id?: number | null
          percentage?: number | null
          stock_name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          mutual_fund_id?: number | null
          percentage?: number | null
          stock_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_allocations_mutual_fund_id_fkey"
            columns: ["mutual_fund_id"]
            isOneToOne: false
            referencedRelation: "mutual_funds"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
